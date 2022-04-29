export interface Teacher {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Term {
  id: number;
  number: number;
}

export interface Discipline {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  name: string;
  category: Category;
  pdfUrl: string;
  viewCount: number;
}

export interface CreateTestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
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
