import { Response } from "express";

interface IResponses {
  ok: Function;
  badRequest: Function;
  unauthorized: Function;
  notFound: Function;
  internalServerError: Function;
};

const ok = (res: Response, data = {}, message = 'OK', code = 200) => {
  res.status(code).json({
    statusCode: code,
    success: true,
    data,
    message
  });
};

const badRequest = (res: Response, message = 'BAD REQUEST', code = 400) => {
  res.status(code).json({
    statusCode: code,
    success: false,
    message
  });
};

const unauthorized = (res: Response, message = 'UNAUTHORIZED', code = 401) => {
  res.status(code).json({
    statusCode: code,
    success: false,
    message
  });
};

const notFound = (res: Response, message = 'NOT FOUND', code = 404) => {
  res.status(code).json({
    statusCode: code,
    success: false,
    message
  });
};

const internalServerError = (res: Response, message = 'INTERNAL SERVER ERROR', code = 500) => {
  res.status(code).json({
    statusCode: code,
    success: false,
    message
  });
};

export { 
  ok,
  badRequest,
  unauthorized,
  notFound,
  internalServerError,
  IResponses
}