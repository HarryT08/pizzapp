import { Request, Response } from "express";
import { User } from "../entities/User";

/*
Metodo para hacer insercciones de usuarios en la base de datos, usando el ORM de typeorm
*/
export function createUser(req: Request, res: Response): Response {
  console.log(req.body);
  const { username, password, cedula, idRol } = req.body;
  const user = new User(cedula, idRol, username, password);
  user.save();
  return res.send(req.body);
}