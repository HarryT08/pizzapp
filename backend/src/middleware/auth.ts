import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';  
export const SECRET_KEY: Secret = 'secret';


export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);

    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send('Please authenticate');
  }
};