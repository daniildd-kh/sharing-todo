import { AxiosResponse } from "axios";
import $api from "../http";
import { UsersResponse } from "../models";

export default class UsersService{
  static async getAllUsers(): Promise<AxiosResponse<UsersResponse>> {
    return await $api.get<UsersResponse>('/api/users');
  }
}