import { axiosInstance, configAuth } from "./api";

async function getTestsByDisciplines(token: string) {
  return axiosInstance.get<{ terms: any[] }>(
    "/tests-by-disciplines",
    configAuth(token)
  );
}

async function getTestsByTeachers(token: string) {
  return axiosInstance.get<{ teachers: any[] }>(
    "/tests-by-teachers",
    configAuth(token)
  );
}

export default { getTestsByDisciplines, getTestsByTeachers };
