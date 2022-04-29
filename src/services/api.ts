import axios from "axios";

import user from "./user";
import auth from "./auth";
import test from "./test";
import category from "./category";
import discipline from "./discipline";
import teacher from "./teacher";

export const axiosInstance = axios.create({
  baseURL: "https://jeff-repo-provas.herokuapp.com",
});

export function configAuth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const api = { user, auth, test, category, discipline, teacher };

export default api;
