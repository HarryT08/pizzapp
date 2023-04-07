import { Request, Response } from 'express';
import { DetalleComanda } from '../entities/DetalleComanda';

export const crearDetalles = (data : unknown) => {
  return {};
};

export const getDetalles = async (req: Request, res: Response) => {
  try{
    const detalles = await DetalleComanda.find({
      where: { idComanda: parseInt(req.params.idComanda) },
      relations: ['producto']
    });
    res.json(detalles);
  }catch(error){
    console.error(error);
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
}
