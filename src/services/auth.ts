import { axiosInstance } from "./api";
import { User } from "./user";

type Login = User;

async function login(login: Login) {
  return axiosInstance.post<{ token: string }>(`/auth/login`, login);
}

export default { login };
