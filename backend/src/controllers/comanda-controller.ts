import { Request, Response } from 'express';
import { Comanda } from '../entities/Comanda';

/*
Metodo para buscar las comandas de una mesa, usando el ORM de typeorm
*/
export const getComandaByMesa = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {estado} = req.query;
        const comanda = await Comanda.findOne({where: {idMesa: parseInt(id), estado: String(estado)}, relations: ["detalleComanda","mesa","detalleComanda.producto"]});
        res.json(comanda);
    }catch(error){
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}

/*
Metodo para actualizar el estado de la comanda, usando el ORM de typeorm
*/
export const updateStateComanda = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {estado} = req.body;
        const comanda = await Comanda.findOne({where: {idMesa: parseInt(id)}});
        if(comanda){
            comanda.estado = estado;
            await comanda.save();
            res.json({message: 'Comanda actualizada'});
        }else{
            res.status(404).json({message: 'Comanda no encontrada'});
        }
    }catch(error){
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}

/*
Metodo para obtener las comandas, usando el ORM de typeorm
*/
export const getComandas = async (req: Request, res: Response) => {
    try{
        const comandas = await Comanda.find({order: {id: "DESC"}});
        res.json(comandas);
    }catch(error){
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}

/*
Metodo para obtener las ultimas cinco comandas, usando el ORM de typeorm
*/
export const getLastComandas = async (req: Request, res: Response) => {
    try{
        const date = new Date();
        const comandas = await Comanda.find({order: {id: "DESC"}, take: 5});
        res.json(comandas);
    }catch(error){
        if (error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}