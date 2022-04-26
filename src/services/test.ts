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
}

export type TeacherWithTestsData = Teacher & {
  teachersDisciplines: {
    discipline: Discipline;
    tests: Test[];
  }[];
};
export interface TestsByTeachers {
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

export interface TestsByDisciplines {
  terms: TermWithTestsData[];
}

async function getTestsByDisciplines(token: string) {
  return axiosInstance.get<TestsByDisciplines>(
    "/tests-by-disciplines",
    configAuth(token)
  );
}

async function getTestsByTeachers(token: string) {
  return axiosInstance.get<TestsByTeachers>(
    "/tests-by-teachers",
    configAuth(token)
  );
}

export default { getTestsByDisciplines, getTestsByTeachers };
