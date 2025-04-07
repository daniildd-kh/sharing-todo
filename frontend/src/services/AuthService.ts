import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse, ProfileRespose } from "../models";
import { IProfile } from "../pages/ProfilePage/components/ProfileForm/ProfileForm";

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

  static async updateProfile(
    credentials: IProfile
  ): Promise<AxiosResponse<ProfileRespose>> {
    return await $api.post<ProfileRespose>("/api/profile/update/", credentials);
  }
}
