import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models";

export default class AuthService {
  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/api/auth/login", credentials);
  }

  static async registration(credentials: {
    name: string;
    email: string;
    password: string;
  }): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>("/api/auth/register", credentials);
  }

  static async logout(): Promise<void> {
    return await $api.post("/api/auth/logout");
  }
}
