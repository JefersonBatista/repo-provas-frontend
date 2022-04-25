import axios from "axios";

import user from "./user";
import auth from "./auth";
import test from "./test";

export const axiosInstance = axios.create({
  baseURL: "https://jeff-repo-provas.herokuapp.com",
});

export function configAuth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const api = { user, auth, test };

export default api;
