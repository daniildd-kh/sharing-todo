import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
  const errorStatus = err.statusCode || 500;
  const errorMessage = errorStatus === 500 ? 'Произошла ошибка на сервере' : err.message;
  res.status(errorStatus).send({message: errorMessage});
}

export default errorHandler;