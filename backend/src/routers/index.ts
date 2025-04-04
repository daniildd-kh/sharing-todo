import { Router } from "express";
import tasksRouter from "./tasks";
import authRouter from "./auth";
import usersRouter from "./users";
import { profileRouter } from "./profile";

const router = Router();

router.use("/api/tasks", tasksRouter);
router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/profile", profileRouter);

export default router;
