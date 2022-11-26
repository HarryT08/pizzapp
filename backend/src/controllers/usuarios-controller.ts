import { Request, Response } from "express";
import { User } from "../entities/User";
import { Persona } from "../entities/Persona";
import { Rol } from "../entities/Rol";

/*
Metodo para hacer insercciones de usuarios en la base de datos, usando el ORM de typeorm
*/

export const createUser = async (req: Request, res: Response) => {  
  try {
    
    console.log(req.body)
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
  try {
    const users = await User.find({relations: ["rol", "persona"]});
    if(users.length > 0)
      return res.json(users);
    else
      return res.status(404).json({data: "No hay usuarios"});
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const {cedula} = req.params;
    const result = await User.delete({cedula: parseInt(cedula)});
    if(result.affected === 0) return res.status(404).json({message: "Usuario no encontrado"});

    return res.status(202).json({message: "Usuario eliminado"});
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    let { username, password, cedula, idRol, nombre, apellido, celular } = req.body;
    const persona = new Persona();
    const user = new User();
    persona.init(cedula, nombre, apellido, celular);
    if(password.indexOf("$2b$10$") === -1){
      password = user.encryptPassword(password);
    }
    Persona.update({cedula: cedula}, persona);
    User.createQueryBuilder()
      .update(User)
      .set({username: username, password: password, idRol: idRol})
      .where("cedula = :cedula", { cedula: cedula })
      .execute();
    return res.status(202).json({message: "Usuario actualizado"});
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({message: error.message});
  }
}