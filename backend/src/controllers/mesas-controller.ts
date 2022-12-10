import { Request, Response } from 'express';
import { Mesa } from '../entities/Mesa';

/*
Metodo para buscar todas las mesas, usando el ORM de typeorm
*/
export const getMesas = async (req: Request, res: Response) => {
    const mesas = await Mesa.find();
    return res.json(mesas);
}