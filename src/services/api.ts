import axios from "axios";
import user from "./user";
import auth from "./auth";

export const axiosInstance = axios.create({
  baseURL: "https://jeff-repo-provas.herokuapp.com",
});

const api = {
  user,
  auth,
};

export default api;
