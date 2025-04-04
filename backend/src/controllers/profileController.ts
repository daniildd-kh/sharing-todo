import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";
import { RequestWithUserData } from "../middlewares/auth";
import bcrypt from "bcrypt";

interface UpdateData {
  name?: string;
  email?: string;
  password?: string;
}

export const updateProfile = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Необходима авторизация" });
      return;
    }
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const updateData: UpdateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 5);

    const updatedProfile = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).orFail(() => new Error("Пользователь не найден"));
    res.status(200).json({ message: "success", user: updatedProfile });
    return;
  } catch (error) {
    return next(error);
  }
};
