import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  cedula: number;
  iat: number;
  exp: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authorization.substring(7);

  if (!token) return res.status(401).json({ message: 'No autorizado' });

  try {
    const payload = jwt.verify(token, 'secret') as IPayload;
    res.locals.cedula = payload.cedula;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' });
  }
};
