import { NextFunction, Response } from "express";
import { UserModel } from "../models/User";
import { RequestWithUserData } from "../middlewares/auth";
import bcrypt from "bcrypt";
import { GenderEnum, LanguageEnum } from "../models/User";

interface UpdateData {
  name?: string;
  password?: string;
  email?: string;
  fullName?: string;
  gender?: GenderEnum;
  language?: LanguageEnum;
  country?: string;
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
    const { name, password, fullName, gender, language, country, email } =
      req.body;

    const updateData: UpdateData = {};

    if (name) updateData.name = name;
    if (fullName) updateData.fullName = fullName;
    if (country) updateData.country = country;
    if (email) updateData.email = email;

    if (gender && Object.values(GenderEnum).includes(gender)) {
      updateData.gender = gender;
    }

    if (language && Object.values(LanguageEnum).includes(language)) {
      updateData.language = language;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 5);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).orFail(() => new Error("Пользователь не найден"));

    res.status(200).json({ message: "success", user: updatedUser });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
