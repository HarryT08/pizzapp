import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

/*
Metodo para hacer insercciones de usuarios en la base de datos, usando el ORM de typeorm
*/
export const createUser = async (req: Request, res: Response) => {  
  try {
    let { username, password, cedula, idRol } = req.body;
    //Encriptar la contraseña
    password = bcrypt.hashSync(password, 10);  
    const user = new User();  
    user.cedula = cedula;
    user.idRol = idRol;
    user.username = username;
    user.password = password;
    await user.save();
    return res.send(req.body);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

export const getUserByPhone = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy(req.params);
    return res.json(user);
  } catch (error) {
    if(error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}