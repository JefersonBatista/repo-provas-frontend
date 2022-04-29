import { axiosInstance, configAuth } from "./api";

async function getByDisciplineId(token: string, disciplineId: number) {
  return axiosInstance.get(
    `/disciplines/${disciplineId}/teachers`,
    configAuth(token)
  );
}

export default { getByDisciplineId };
