import { axiosInstance, configAuth } from "./api";

interface Teacher {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Term {
  id: number;
  number: number;
}

interface Discipline {
  id: number;
  name: string;
}

interface Test {
  id: number;
  name: string;
  category: Category;
  pdfUrl: string;
  viewCount: number;
}

export type TeacherWithTestsData = Teacher & {
  teachersDisciplines: {
    discipline: Discipline;
    tests: Test[];
  }[];
};
export interface TestsByTeachersType {
  teachers: TeacherWithTestsData[];
}

export type TermWithTestsData = Term & {
  disciplines: (Discipline & {
    teachersDisciplines: {
      teacher: Teacher;
      tests: Test[];
    }[];
  })[];
};

export type DisciplineWithTestsData = Discipline & {
  teachersDisciplines: {
    teacher: Teacher;
    tests: Test[];
  }[];
};

export interface TestsByDisciplinesType {
  terms: TermWithTestsData[];
}

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

export default {
  getTestsByDisciplines,
  getTestsByTeachers,
  incrementViewCount,
};
