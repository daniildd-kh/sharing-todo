import axios from "axios";
export const BASE_URL = "http://localhost:3000";

const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return config;
});

$api.interceptors.request.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.get("api/auth/refresh-token", {
          withCredentials: true,
        });
        const accessToken = response.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return $api.request(error.config);
      } catch (error) {
        console.log("Ошибка обновления токена:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }
);

export default $api;
