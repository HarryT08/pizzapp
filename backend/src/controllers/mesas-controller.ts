import { Request, Response } from 'express';
import { Mesa } from '../entities/Mesa';

/*
Metodo para buscar todas las mesas, usando el ORM de typeorm
*/
export const getMesas = async (req: Request, res: Response) => {
    const mesas = await Mesa.find();
    return res.json(mesas);
}

/*
Metodo para crear una mesa, usando el ORM de typeorm
*/
export const createMesa = async (req: Request, res: Response) => {
    try{
        const {id} = req.body;
        var mesa = await Mesa.findOneBy({id: id});
        if(mesa){
            return res.status(404).json({message: "El número de mesa " + id + " ya existe"});
        }
        mesa = new Mesa();
        mesa.init(id, "Disponible");
        await mesa.save();
        res.status(202).json({message: "Mesa creada"});
    }catch(error){
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}

export const deleteMesa = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await Mesa.delete({id: parseInt(id)});
        if(result.affected === 0) return res.status(404).json({message: "Mesa no encontrada"});

        return res.status(202).json({message: "Mesa eliminada"});
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}