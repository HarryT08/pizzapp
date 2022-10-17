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
    user.init(username, password, cedula, idRol);
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