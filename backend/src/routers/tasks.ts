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

tasksRouter.get("/", getUserAllTasks);
tasksRouter.put("/reorder", reorderedTasks);
tasksRouter.get("/me", auth, getUserTasks);
tasksRouter.post("/", addTask);
tasksRouter.delete("/:id", removeTask);
tasksRouter.put("/:id", updateTask);

export default tasksRouter;
