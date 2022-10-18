import { Request, Response } from "express";
import { User } from "../entities/User";
import { Persona } from "../entities/Persona";
import { Rol } from "../entities/Rol";
import bcrypt from "bcrypt";

/*
Metodo para hacer insercciones de usuarios en la base de datos, usando el ORM de typeorm
*/
export const createUser = async (req: Request, res: Response) => {  
  try {
    
    let { username, password, cedula, idRol, nombre, apellido, celular } = req.body;
    //Encriptar la contraseña
    password = bcrypt.hashSync(password, 10);  
    const user = new User();
    const persona = new Persona();
    const rol = new Rol();
    persona.init(cedula, nombre, apellido, celular);
    rol.init(idRol, "");
    user.init(cedula, rol, username, password, persona);
    await user.save();
    return res.send(req.body);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

/*
Metodo para buscar todos los usuarios, usando el ORM de typeorm
*/
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({relations: ["rol", "persona"]});
    return res.json(users);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

/*
Metodo para buscar un usuario y si este existe comprobar la contraseña y retornar el mensaje
*/
export const login = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    //buscar el usuario por su username
    const user = await User.findOneBy({ username: username }) ;

    if(user && checkData(user , password)){
      return res.json({ message : "Login Exitoso" });
    }
    return res.status(404).json({
      message : "Usuario o contraseña incorrectos",
    });

  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

const checkData = (user : User, password : string) => {
  let match = bcrypt.compareSync(password, user.password);
  return match;
}