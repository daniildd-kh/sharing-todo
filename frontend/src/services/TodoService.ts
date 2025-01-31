import { AxiosResponse } from "axios";
import $api from "../http";
import { TasksRespose, TaskRespose, ITaskRequest } from "../models";

export default class TodoService {
  static async getUserTasks(): Promise<AxiosResponse<TasksRespose>> {
    return await $api.get<TasksRespose>("/api/tasks/me");
  }
  static async updateUserTask(
    credentials: ITaskRequest
  ): Promise<AxiosResponse<TaskRespose>> {
    const { _id, ...updatedData } = credentials;
    return await $api.put<TaskRespose>(`/api/tasks/${_id}`, updatedData);
  }

  static async removeUserTask(credentials: {
    _id: string;
  }): Promise<AxiosResponse<TaskRespose>> {
    return await $api.delete<TaskRespose>(`/api/tasks/${credentials._id}`);
  }

  static async addUserTask(
    credentials: ITaskRequest
  ): Promise<AxiosResponse<TaskRespose>> {
    return await $api.post<TaskRespose>("/api/tasks/", credentials);
  }
}
