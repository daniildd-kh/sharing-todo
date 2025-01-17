import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET: string = process.env.JWT_SECRET || "secret-jwt";

interface RequestWithUserData extends Request{
  user?: {id: string};
}

export default (req: RequestWithUserData, res: Response, next: NextFunction) =>{
  const {authorization} = req.headers;

  if(!authorization){
    res.status(401).send({
      message: 'Пользователь неавторизирован'
    })
    return;
  }

  const token = authorization.split(' ')[1];

  const payload = jwt.verify(token, JWT_ACCESS_SECRET) as {id: string};

  if(!payload){
    res.status(401).send({
      message: 'Необходима авторизация'
    })
    return
  }
  req.user = payload;
  next();
}