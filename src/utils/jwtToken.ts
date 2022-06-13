import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;
const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION || '2h';

export const generateToken = (data: Object, expiresIn = JWT_EXPIRATION) => {
  const payload = {
    ...data
  };
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
};
