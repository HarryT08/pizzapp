import { Request, Response } from "express";
import { User } from "../entities/User";
import { Persona } from "../entities/Persona";
import { Rol } from "../entities/Rol";

/*
Metodo para hacer insercciones de usuarios en la base de datos, usando el ORM de typeorm
*/

export const createUser = async (req: Request, res: Response) => {  
  try {
    
    let { username, password, cedula, idRol, nombre, apellido, celular } = req.body;
    //Encriptar la contraseña
    const user = new User();
    const persona = new Persona();
    const rol = new Rol();
    password = user.encryptPassword(password);  
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
  //!PARA SOCIALIZAR
  //if( req.body.mi_rol != 'admin') return res.status(400).json({message: "No tienes permisos para realizar esta accion"});
  try {
    const users = await User.find({relations: ["rol", "persona"]});
    return res.json(users);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}
