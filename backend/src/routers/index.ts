import { Router } from "express";
import tasksRouter from "./tasks";
import authRouter from "./auth";
import usersRouter from "./users";

const router = Router();


router.use('/api/tasks', tasksRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);


export default router;