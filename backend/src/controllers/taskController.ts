import { NextFunction, Request, Response } from "express";
import { TaskModel } from "../models/Task";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const tasks = await TaskModel.find({});
    if(!tasks){
      res.status(404).json({ message: "Задачи не были найдены" });
    }
    return res.status(200).json({
      message: 'success',
      tasks: tasks,
    })
  }
  catch(error){
    return next(error);
  }
};

const getUserTask = async (req: Request, res: Response) =>{

};

const addNewTask = async (req: Request, res: Response) =>{

};