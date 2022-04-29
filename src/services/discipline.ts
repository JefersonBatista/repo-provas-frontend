import { axiosInstance, configAuth } from "./api";

async function getAll(token: string) {
  return axiosInstance.get(`/disciplines`, configAuth(token));
}

export default { getAll };
