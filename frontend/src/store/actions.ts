import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import { AuthResponse, ITask, ITaskRequest } from "../models";
import $api from "../http";
import UsersService from "../services/UsersService";
import TodoService from "../services/TodoService";

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await AuthService.login(credentials);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return response.data?.user;
    } catch (error) {
      throw new Error(`Ошибка входа в систему ${error}`);
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  "auth/register",
  async (credentials: { name: string; email: string; password: string }) => {
    try {
      const response = await AuthService.registration(credentials);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return response.data?.user;
    } catch (error) {
      throw new Error(`Ошибка регистрации ${error}`);
    }
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async () => {
  try {
    await AuthService.logout();
    localStorage.removeItem("accessToken");
  } catch (error) {
    throw new Error(`Ошибка при выходе ${error}`);
  }
});

export const fetchGetAllUsers = createAsyncThunk("users/all", async () => {
  try {
    const response = await UsersService.getAllUsers();
    return response.data.users;
  } catch (error) {
    throw new Error(`Ошибка при получении пользователей ${error}`);
  }
});

export const checkAuth = createAsyncThunk("auth/check", async () => {
  try {
    const response = await $api.get<AuthResponse>("api/auth/refresh-token", {
      withCredentials: true,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data?.user;
  } catch (error) {
    throw new Error(`Ошибка обновления токена ${error}`);
  }
});

export const fetchGetUserTasks = createAsyncThunk("tasks/me", async () => {
  try {
    const response = await TodoService.getUserTasks();
    return response.data.tasks;
  } catch (error) {
    throw new Error(`Ошибка во время получения задач ${error}`);
  }
});

export const fetchUpdateUserTask = createAsyncThunk(
  "task/me/update",
  async (credentials: ITaskRequest) => {
    try {
      const response = await TodoService.updateUserTask(credentials);
      return response.data.task;
    } catch (error) {
      throw new Error(`Возникла ошибка при обновлении задачи ${error}`);
    }
  }
);

export const fetchRemoveUserTask = createAsyncThunk(
  "task/me/remove",
  async (credentials: { _id: string }) => {
    try {
      const response = await TodoService.removeUserTask(credentials);
      return response.data.task._id;
    } catch (error) {
      throw new Error(`Возникла ошибка при удалении задачи ${error}`);
    }
  }
);

export const fetchAddUserTask = createAsyncThunk(
  "task/me/add",
  async (credentials: ITaskRequest) => {
    try {
      const response = await TodoService.addUserTask(credentials);
      return response.data.task;
    } catch (error) {
      throw new Error(`Возникла ошибка при создании задачи ${error}`);
    }
  }
);
