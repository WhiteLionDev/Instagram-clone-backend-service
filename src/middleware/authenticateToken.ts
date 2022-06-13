import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  unauthorized,
  internalServerError
} from "../utils/apiResponse";
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

/**
 * Verify a jwt token
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
      return unauthorized(res);

    jwt.verify(token, JWT_SECRET as string, (err: any, decodedToken: any) => {

      if (err) 
        return unauthorized(res, err.toString());

      const { userId } = decodedToken;

      req.params.userId = userId;
      req.body.userId = userId;
      req.query.userId = userId;

      next();
    })
  } catch (err: any) {
    internalServerError(res, err.toString());
  }
};
