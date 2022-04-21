import axios from "axios";
import user from "./user";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

const api = {
  user,
};

export default api;
