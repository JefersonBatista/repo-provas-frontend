import { useEffect, useState } from "react";
import { Input } from "@mui/material";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import {
  TestsByTeachersType,
  TeacherWithTestsData,
  Category,
} from "../services/types";
import { Logo, Logout, PageSelector } from "../components";

export default function TestsByTeacher() {
  const { token } = useAuth();

  const [teachers, setTeachers] = useState<TeacherWithTestsData[] | null>(null);
  const [filter, setFilter] = useState<string>("");

  async function getTestsByTeachers() {
    try {
      const { data } = await api.test.getTestsByTeachers(token);
      const { teachers: teachersData } = data as TestsByTeachersType;

      setTeachers(teachersData);
    } catch (error) {
      alert(
        "Não foi possível listar as provas.\nPor favor, recarregue a página"
      );
    }
  }

  function getTestsOfTeacher(teacher: TeacherWithTestsData) {
    return teacher.teachersDisciplines.map((td) => {
      return td.tests.map((test) => ({
        ...test,
        discipline: td.discipline.name,
      }));
    });
  }

  function getTestCategoriesOfTeacher(teacher: TeacherWithTestsData) {
    const ids = new Set<number>();
    const categories = [] as Category[];

    teacher.teachersDisciplines.forEach((td) => {
      td.tests.forEach((test) => {
        const category = test.category;

        if (!ids.has(category.id)) {
          ids.add(category.id);
          categories.push(category);
        }
      });
    });

    categories.sort((a, b) => a.id - b.id);
    return categories;
  }

  async function accessTestPdfUrl(id: number, pdfUrl: string) {
    try {
      await api.test.incrementViewCount(token, id);
      getTestsByTeachers();
      window.open(pdfUrl);
    } catch (error: any) {
      alert(error.response.data);
    }
  }

  useEffect(() => {
    getTestsByTeachers();
  }, []);

  if (teachers === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <div className="header">
        <Logo />
        <Logout />
      </div>

      <PageSelector loading={false} />

      <div className="tests">
        <Input
          placeholder="Filtre por pessoa instrutora"
          autoFocus
          fullWidth
          style={{ alignSelf: "center", marginBottom: "20px", height: "20px" }}
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        />

        {teachers
          .filter((teacher) =>
            teacher.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((teacher) => {
            const categories = getTestCategoriesOfTeacher(teacher);

            return (
              <div key={teacher.id}>
                <h2>{teacher.name}</h2>

                {categories.map((c) => (
                  <div key={c.id}>
                    <h3 key={c.id}>{c.name}</h3>

                    {getTestsOfTeacher(teacher).map((td) => {
                      return td
                        .filter((t) => t.category.id === c.id)
                        .map((test) => {
                          return (
                            <p key={test.id}>
                              <span
                                onClick={() =>
                                  accessTestPdfUrl(test.id, test.pdfUrl)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {test.name}
                              </span>
                              <span className="info">
                                {` (${test.discipline}) [${test.viewCount} visualizações]`}
                              </span>
                            </p>
                          );
                        });
                    })}
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}
