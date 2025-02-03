import { NextFunction, Request, Response } from "express";
import { ITask, TaskModel } from "../models/Task";
import { UserModel } from "../models/User";
import { NotFoundError } from "../errors/not-found-error";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await TaskModel.find({}).sort({ order: 1 }).populate("owner");
    if (!tasks) {
      res.status(404).json({ message: "Задачи не были найдены" });
      return;
    }
    res.status(200).json({
      message: "success",
      tasks: tasks,
    });
  } catch (error) {
    return next(error);
  }
};

export const reorderedTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reorderedTasks = req.body;
    const updatedPromises = reorderedTasks.map(
      async (task: ITask, index: number) => {
        return await TaskModel.findByIdAndUpdate(
          task._id,
          { order: index },
          { new: true }
        );
      }
    );
    await Promise.all(updatedPromises);
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return next(error);
  }
};

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status, isImportant, owner, order } = req.body;

    const isUserExist = await UserModel.exists({ _id: owner });
    if (!isUserExist) {
      throw new NotFoundError("Пользователь с указанным ID не существует");
    }
    const lastIndex = await TaskModel.findOne().sort({ order: -1 });
    const newOrder = lastIndex ? lastIndex.order + 1 : 0;

    const newTask = new TaskModel({
      title,
      description,
      status,
      isImportant,
      order: newOrder,
      owner,
    });
    const populateTask = await newTask.populate("owner");
    const createdTask = await populateTask.save();

    res.status(201).json({
      message: "success",
      task: createdTask,
    });
    return;
  } catch (error) {
    return next(error);
  }
};

export const getUserTasks = async (
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user?.id;
    const user = await UserModel.findById(owner)
      .populate("tasks")
      .orFail(() => {
        throw new NotFoundError("Пользователь не был найден");
      });

    const tasks = user?.tasks;
    res.status(200).json({ message: "success", tasks: tasks });
    return;
  } catch (error) {
    return next(error);
  }
};

export const removeTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const removedTask = await TaskModel.findByIdAndDelete(req.params.id)
      .orFail(() => {
        throw new NotFoundError("Не найдена задача по указанному ID");
      })
      .populate("owner");

    res.status(200).json({ message: "success", task: removedTask });
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, isImportant } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      { title, description, status, isImportant },
      { new: true, runValidators: true }
    )
      .orFail(() => {
        throw new NotFoundError("Не найдена задача по указанному ID");
      })
      .populate("owner");

    res.status(200).json({ message: "success", task: updatedTask });
  } catch (error) {
    return next(error);
  }
};
