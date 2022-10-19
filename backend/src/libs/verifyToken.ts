import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface Ipayload {
    cedula: number;
    iat: number;
    exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });
    try {
        const payload = jwt.verify(token, 'secret') as Ipayload;
        //console.log("El payloaaad " , payload) ;
        req.cedula = payload.cedula
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token no valido' });
    }
}