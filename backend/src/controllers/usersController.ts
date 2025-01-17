import { UserModel } from "../models/User";
import { Request, Response } from "express";
import { toUserDto } from "../utils";



export const getAllUsers = async(req: Request, res: Response) =>{
  try{
    const users = await UserModel.find({});
    const usersDtos = users.map(user => toUserDto(user));
    res.status(200).json({
      message: 'success',
      users: usersDtos,
    })
  }catch(err){
    res.status(500).send('Возникла ошибка на сервере')
  }
}