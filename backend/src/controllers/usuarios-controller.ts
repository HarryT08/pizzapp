import { Request, Response } from 'express';

import { connect } from '../database';

export async function getUsuarios(req: Request, res: Response): Promise<Response>{
    const conn = await connect();
    const usuarios = await conn.query("SELECT * FROM usuarios");
    return res.send(usuarios[0]);
}

export async function getUsuario(req: Request, res: Response): Promise<Response>{
    return res.send('USUARIO ID');
}