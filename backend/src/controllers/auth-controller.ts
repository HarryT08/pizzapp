import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Persona } from "../entities/Persona";
import { Rol } from "../entities/Rol";


export const signup = async (req: Request, res: Response) => {
  try {
    let { username, password, cedula, idRol, nombre, apellido, celular } = req.body;
    //Encriptar la contraseña
    console.log(username);
    const user = new User();
    const persona = new Persona();
    const rol = new Rol();
    password = user.encryptPassword(password);  
    persona.init(cedula, nombre, apellido, celular);
    rol.init(idRol, "");
    user.init(cedula, rol, username, password, persona);
    const savedUser = await user.save();  
    const token : string  = jwt.sign({ cedula : savedUser.cedula}, "secret")
    return res.header('auth-token' , token).json(savedUser);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }

}

export const login = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    //buscar el usuario por su username
    const user = await User.findOneBy({ username: username });

    if (user && user.validatePassword(password)) {
      const token = jwt.sign({ cedula : user.cedula }, "secret", {
        expiresIn: 120, // 2 minutes para pruebas
      });
      return res.header('auth-token' , token).json(user);
    }
    return res.status(404).json({
      message: "Usuario o contraseña incorrectos",
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export const pruebaToken = async (req: Request, res: Response) => {
  console.log(req.cedula);
  res.send("prueba")
}