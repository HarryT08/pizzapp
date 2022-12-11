import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { Persona } from '../entities/Persona';
import { Rol } from '../entities/Rol';

export const signup = async (req: Request, res: Response) => {
  try {
    let { username, password, cedula, idRol, nombre, apellido, celular } =
      req.body;
    //Encriptar la contraseña
    const user = new User();
    const persona = new Persona();
    const rol = new Rol();
    password = user.encryptPassword(password);
    persona.init(cedula, nombre, apellido, celular);
    rol.init(idRol, '');
    user.init(cedula, rol, username, password, persona);
    const savedUser = await user.save();
    const token: string = jwt.sign({ cedula: savedUser.cedula }, 'secret');
    return res.header('auth-token', token).json(savedUser);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    //buscar el usuario por su username
    const user = await User.findOne({ where: {username: username}, relations: ["persona", "rol"] });

    if (user && user.validatePassword(password)) {
      const token = jwt.sign({ cedula: user.cedula, nombre: user.persona.nombre, cargo: user.rol.nombre }, 'secret', {
        expiresIn: '9h'
      });

      const { password, ...rest } = user;
            
      return res.send({ token, user: rest });
    }

    return res.status(404).json({
      message: 'Usuario o contraseña incorrectos'
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export const pruebaToken = async (req: Request, res: Response) => {
  console.log(res.locals.cedula);
  res.send('prueba');
};
