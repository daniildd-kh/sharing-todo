import { Router } from "express";
import auth from "../middlewares/auth";
import { updateProfile } from "../controllers/profileController";

export const profileRouter = Router();

profileRouter.post("/update", auth, updateProfile);
