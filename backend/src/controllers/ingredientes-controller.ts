import { Request, Response } from 'express';
import { MateriaPrima } from '../entities/MateriaPrima';

export const createIngredient = (req : Request , res : Response) => {
    const {nombre , existencia} = req.body;
    const materiaPrima = new MateriaPrima();
    materiaPrima.init(nombre, existencia);
    materiaPrima.save();
    return res.send("Ingrediente creado");
}

export const updateIngredient = async (req : Request , res : Response) => {
    let {id, nombre , existencia} = req.body;
    const materiaPrima = await MateriaPrima.findOneBy(id);
    if(materiaPrima){
        materiaPrima.nombre = nombre;
        materiaPrima.existencia += existencia;
        //Esto no me crea otro registro?
        await materiaPrima.save();
        return res.send("Ingrediente actualizado");
    }
    return res.status(404).json({message: "Ingrediente no encontrado"});
}

export const deleteIngredient = async (req : Request , res : Response) => {
    try {
        const {id} = req.body;
        const result = await MateriaPrima.delete({id: parseInt(id)});
        if(result.affected === 0) return res.status(404).json({message: "Ingrediente no encontrado"});
        return res.status(202).json({message: "Ingrediente eliminado"});
    } catch (error) {
        if (error instanceof Error)
        return res.status(500).json({message: error.message});
    }
}

export const getIngredients = async (req : Request , res : Response) => {
    try {
        const ingredientes = await MateriaPrima.find();
        return res.json(ingredientes);
    } catch (error) {
        if (error instanceof Error)
        return res.status(500).json({message: error.message});
    }
}