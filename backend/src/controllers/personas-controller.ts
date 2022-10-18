import { Request, Response } from "express";
import { Persona } from "../entities/Persona";

/*
Metodo para hacer insercciones de personas en la base de datos, usando el ORM de typeorm
*/
export const createPersona = async (req: Request, res: Response) => {  
    let { cedula, nombre, apellido, celular } = req.body;
    const persona = new Persona();
    persona.cedula = cedula;
    persona.nombre = nombre;
    persona.apellido = apellido;
    persona.celular = celular;
    await persona.save();
    return res.send(req.body);
}

/*
Metodo para buscar una persona por su cedula, usando el ORM de typeorm
*/
export function findByCedula(req: Request, res: Response): Response {  
    return res.send(req.body);
}