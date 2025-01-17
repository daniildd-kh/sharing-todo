import { Router } from "express";
import auth from "./auth";
import { getAllUsers } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get('/', auth, getAllUsers);

export default usersRouter;