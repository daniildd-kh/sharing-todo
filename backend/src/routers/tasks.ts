import { Router } from "express";
import {
  addTask,
  getAllTasks,
  getUserTasks,
  removeTask,
  reorderedTasks,
  updateTask,
} from "../controllers/taskController";
import auth from "../middlewares/auth";

const tasksRouter = Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.put("/reorder", reorderedTasks);
tasksRouter.get("/me", auth, getUserTasks);
tasksRouter.post("/", addTask);
tasksRouter.delete("/:id", removeTask);
tasksRouter.put("/:id", updateTask);

export default tasksRouter;
