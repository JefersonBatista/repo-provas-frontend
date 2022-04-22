import axios from "axios";
import user from "./user";
import auth from "./auth";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

const api = {
  user,
  auth,
};

export default api;
