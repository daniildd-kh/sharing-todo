import { Request, Response } from "express";
import { UserModel } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TokenModel } from "../models/Token";
import ms from "ms";

const JWT_ACCESS_SECRET: string = process.env.JWT_SECRET || "secret-jwt";
const JWT_REFRESH_SECRET: string =
  process.env.JWT_SECRET || "secret-refresh-jwt";

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    {
      id: userId,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  return { accessToken, refreshToken };
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send("Все поля должны быть заполнены");
      return;
    }

    const isUserAlreadyExist = await UserModel.findOne({ email });
    if (isUserAlreadyExist) {
      res.status(400).json({ message: "Пользователь уже существует" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const { refreshToken, accessToken } = generateTokens(String(newUser._id));
    const refreshTokenFromDB = await TokenModel.saveToken(
      newUser._id,
      refreshToken
    );

    if (!refreshTokenFromDB) {
      res.status(400).send({ message: "Не удалось создать refresh токен" });
      return;
    }

    res.cookie("refreshToken", refreshTokenFromDB, {
      httpOnly: true,
      maxAge: ms("7d"),
    });

    res.status(200).json({
      message: "успешно!",
      accessToken,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }).select("+password");

    if (!user) {
      res.status(400).json({
        message: "Неправильная почта или пароль",
      });
      return;
    }
    const passStatus = await bcrypt.compare(password, String(user.password));
    if (!passStatus) {
      res.status(400).json({
        message: "Неправильная почта или пароль",
      });
      return;
    }

    const { refreshToken, accessToken } = generateTokens(String(user?._id));
    const refreshTokenFromDB = await TokenModel.saveToken(
      user._id,
      refreshToken
    );

    if (!refreshTokenFromDB) {
      res.status(400).send({ message: "Не удалось создать refresh токен" });
      return;
    }

    res.cookie("refreshToken", refreshTokenFromDB, {
      httpOnly: true,
      maxAge: ms("7d"),
    });

    res.status(200).json({
      message: "успешно!",
      accessToken,
      user: user,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Возникла ошибка во время авторизации",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const refreshTokenCookie = cookies["refreshToken"];
    const decodedToken = jwt.verify(refreshTokenCookie, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await UserModel.findById(decodedToken.id);
    if (!user) {
      res.status(400).send({
        message: "Пользователь не найден",
      });
      return;
    }
    const { accessToken, refreshToken } = generateTokens(String(user?._id));
    const refreshTokenFromDB = await TokenModel.saveToken(
      user._id,
      refreshToken
    );

    if (!refreshTokenFromDB) {
      res.status(400).send({
        message: "Авторизация не удалась",
      });
      return;
    }

    res.cookie("refreshToken", refreshTokenFromDB, {
      httpOnly: true,
      maxAge: ms("7d"),
    });

    res.status(200).send({
      accessToken: accessToken,
      user: user,
    });
    return;
  } catch (error) {
    res.status(400).send({
      message: "Возникла ошибка во время обновления токена",
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try{
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).send({ message: "Необходима авторизация" });
      return;
    }
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "Выход выполнен успешно" });
  } catch (error) {
    res.status(500).send({ message: "Ошибка сервера при выходе" });
  }
};
