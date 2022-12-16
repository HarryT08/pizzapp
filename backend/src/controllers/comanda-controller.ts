import { Request, Response } from 'express';
import { Any } from 'typeorm';
import { Comanda } from '../entities/Comanda';
import { DetalleComanda } from '../entities/DetalleComanda';
import { Mesa } from '../entities/Mesa';
import { setState } from './mesas-controller';

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

    TODO: Metodo para crear una comanda
    TODO: Crear el detalle comanda
    TODO: terminar pedido cambia el estado de la mesa a 'OCUPADO'
    TODO: cancelar pedido cambia el estado de la mesa a 'DISPONIBLE'

*/

const calculateTotal = (data : any) => {
    let total = 0;
    for (const product of data) {
      const { cantidad, costo } = product
      total += cantidad * costo
    }
    return total;
}

export const crearComanda = async (req: Request, res: Response) => {
    try {

        const { data, observacion, id_mesa } = req.body;
        const total = calculateTotal(data);
        const comanda = new Comanda();
        comanda.init(total, id_mesa, new Date(), observacion, 'Abierta')
        setState(id_mesa, 'Ocupado')
        const saved = await comanda.save();

        //Esto se saca en un metodo aparte para hacer los detalle comanda :D
        for (const product of data) {
            const subtotal = product.costo * product.cantidad
            const detalleComanda = new DetalleComanda();
            detalleComanda.init(saved.id, subtotal, product.cantidad, product.id, product.tamanio)
            await detalleComanda.save(); //Se le podria quitar el await para no esperar a que se guarden todos los detalles
        }
        return res.json({message: 'Comanda creada'});

    } catch (error) {
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