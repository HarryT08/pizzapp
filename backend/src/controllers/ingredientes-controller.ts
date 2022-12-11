import { Request, Response } from 'express';
import { MateriaPrima } from '../entities/MateriaPrima';

export const createIngredient = async(req : Request , res : Response) => {
    const {nombre , existencia} = req.body;
    const materiaPrima = new MateriaPrima();
    materiaPrima.init(nombre, existencia);
    const saved = await materiaPrima.save();
    return res.json({...saved});
}

export const updateIngredient = async (req : Request , res : Response) => {
    const id = parseInt(req.params['id'])
    let {nombre , existencia} = req.body;
    //console.log("El id de " + nombre + " es " + id);
    const materiaPrima = await MateriaPrima.findOneBy({id : id});
    if(materiaPrima){
        materiaPrima.nombre = nombre;
        materiaPrima.existencia += parseInt(existencia);
        await materiaPrima.save();
        return res.send("Ingrediente actualizado");
    }
    return res.status(404).json({message: "Ingrediente no encontrado"});
}

export const deleteIngredient = async (req : Request , res : Response) => {
    try {
        const id = parseInt(req.params['id'])
        const result = await MateriaPrima.delete(id);
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