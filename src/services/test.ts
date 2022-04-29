import { axiosInstance, configAuth } from "./api";
import {
  TestsByDisciplinesType,
  TestsByTeachersType,
  CreateTestData,
} from "./types";

async function getTestsByDisciplines(token: string) {
  return axiosInstance.get<TestsByDisciplinesType>(
    "/tests-by-disciplines",
    configAuth(token)
  );
}

async function getTestsByTeachers(token: string) {
  return axiosInstance.get<TestsByTeachersType>(
    "/tests-by-teachers",
    configAuth(token)
  );
}

async function incrementViewCount(token: string, id: number) {
  return axiosInstance.patch(
    `/tests/${id}/increment-view-count`,
    {},
    configAuth(token)
  );
}

async function add(token: string, data: CreateTestData) {
  return axiosInstance.post(`/tests`, data, configAuth(token));
}

export default {
  getTestsByDisciplines,
  getTestsByTeachers,
  incrementViewCount,
  add,
};
