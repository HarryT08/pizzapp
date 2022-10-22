import { Request, Response } from "express";
import { Persona } from "../entities/Persona";

/*
Metodo para hacer insercciones de personas en la base de datos, usando el ORM de typeorm
*/
export const createPersona = async (req: Request, res: Response) => {  
    let { cedula, nombre, apellido, celular } = req.body;
    const persona = new Persona();
    persona.init(cedula, nombre, apellido, celular);
    await persona.save();
    return res.send(req.body);
}

/*
Metodo para buscar una persona por su cedula, usando el ORM de typeorm
*/
export const findByCedula = async (req: Request, res: Response) => {  
    try {
        const persona = await Persona.findOneBy(req.params);
        return res.json(persona);
    } catch (error) {
    if(error instanceof Error)
        return res.status(500).json({message: error.message});
    }
}