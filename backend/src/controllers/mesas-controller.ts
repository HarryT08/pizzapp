import { Request, Response } from 'express';
import { Mesa } from '../entities/Mesa';
// import { connect } from '../database';

// export async function getMesas(req:Request, res:Response): Promise<Response>{
//     const conn = await connect();
//     const mesa = await conn.query('SELECT * FROM mesas');
//     return res.send(mesa[0]);
// }

/*
Metodo para buscar todas las mesas, usando el ORM de typeorm
*/
export const getMesas = async (req: Request, res: Response) => {
    const mesas = await Mesa.find();
    return res.json(mesas);
}