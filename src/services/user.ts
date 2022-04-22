import { axiosInstance } from "./api";

export interface User {
  email: string;
  password: string;
}

async function signUp(newUser: User) {
  return axiosInstance.post(`/users`, newUser);
}

export default {
  signUp,
};
