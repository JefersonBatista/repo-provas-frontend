import { axiosInstance, configAuth } from "./api";

async function getAll(token: string) {
  return axiosInstance.get(`/categories`, configAuth(token));
}

export default { getAll };
