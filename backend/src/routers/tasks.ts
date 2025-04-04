import { Router } from "express";
import {
  addTask,
  getUserAllTasks,
  getUserTasks,
  removeTask,
  reorderedTasks,
  updateTask,
} from "../controllers/taskController";
import auth from "../middlewares/auth";

const tasksRouter = Router();

tasksRouter.get("/", auth, getUserAllTasks);
tasksRouter.put("/reorder", auth, reorderedTasks);
tasksRouter.get("/me", auth, getUserTasks);
tasksRouter.post("/", auth, addTask);
tasksRouter.delete("/:id", auth, removeTask);
tasksRouter.put("/:id", auth, updateTask);

export default tasksRouter;
