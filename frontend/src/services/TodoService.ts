import { AxiosResponse } from "axios";
import $api from "../http";
import { TaskRespose } from "../models";

export default class TodoService {
  static async getUserTasks(): Promise<AxiosResponse<TaskRespose>> {
    return await $api.get<TaskRespose>("/api/tasks/me");
  }
}
