import { Request, Response } from 'express';

import { connect } from '../database';

export async function getProducts(req : Request, res : Response): Promise<Response>{
    const conn = await connect();
    const product = await conn.query('SELECT * FROM productos');
    return res.send(product[0]);
}