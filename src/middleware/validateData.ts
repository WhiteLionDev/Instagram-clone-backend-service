import { Request, Response, NextFunction } from "express";
import {
  badRequest,
  internalServerError
} from "../utils/apiResponse";
import { Schema } from 'joi'

/**
 * Validate request parameters with joi
 * @param schema joi validation schema
 * @param check where params to validate are
 */
export const validateData = (schema: Schema, check: "body" | "query" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[check]);

      if (error) {
        return badRequest(res, error.toString());
      }
      else {
        next();
      }
    } catch (err: any) {
      internalServerError(res, err.toString());
    }
  };
}
