import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import { AuthResponse, ITask, ITaskRequest } from "../models";
import $api from "../http";
import UsersService from "../services/UsersService";
import TodoService from "../services/TodoService";
import axios from "axios";
import { IProfile } from "../pages/ProfilePage/components/ProfileForm/ProfileForm";

type INewTask = Omit<ITask, "_id">;

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(credentials);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return response.data?.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Ошибка авторизации"
        );
      }
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  "auth/register",
  async (
    credentials: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.registration(credentials);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return response.data?.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Ошибка регистрации"
        );
      }
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

export const fetchGetCommonTasks = createAsyncThunk(
  "tasks/commom",
  async () => {
    try {
      const response = await TodoService.getCommonTasks();
      return response.data.tasks;
    } catch (error) {
      throw new Error(`Ошибка во время получения общих задач ${error}`);
    }
  }
);

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
      return response.data.task;
    } catch (error) {
      throw new Error(`Возникла ошибка при удалении задачи ${error}`);
    }
  }
);

export const fetchAddUserTask = createAsyncThunk<
  INewTask,
  { credentials: INewTask; ws: WebSocket | null }
>("task/me/add", async ({ credentials, ws }) => {
  try {
    const response = await TodoService.addUserTask(credentials);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "updateTodo" }));
    }

    return response.data.task;
  } catch (error) {
    throw new Error(`Возникла ошибка при создании задачи ${error}`);
  }
});

export const fetchUpdateProfile = createAsyncThunk(
  "update/profile",
  async (credentials: IProfile) => {
    try {
      const response = await AuthService.updateProfile(credentials);
      return response.data.user;
    } catch (error) {
      throw new Error(`Возникла ошибка при обновлении профиля ${error}`);
    }
  }
);
