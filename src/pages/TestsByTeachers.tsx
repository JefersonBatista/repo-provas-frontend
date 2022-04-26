import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { TestsByTeachersType, TeacherWithTestsData } from "../services/test";
import { Logo, Logout } from "../components";

export default function TestsByTeacher() {
  const { token } = useAuth();

  const [teachers, setTeachers] = useState<TeacherWithTestsData[] | null>(null);

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
      return td.tests.map((test) => {
        const { id, name } = test;
        return {
          categoryId: test.category.id,
          id,
          name,
          discipline: td.discipline.name,
        };
      });
    });
  }

  function getTestCategoriesOfTeacher(teacher: TeacherWithTestsData) {
    const categoryTable: { [key: number]: { id: number; name: string } } = {};

    teacher.teachersDisciplines.forEach((td) => {
      td.tests.forEach((test) => {
        const c = test.category;
        if (!categoryTable[c.id]) {
          categoryTable[c.id] = c;
        }
      });
    });

    return Object.values(categoryTable).sort((a, b) => a.id - b.id);
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

      <div className="tests">
        <Link to="/tests-by-disciplines">
          Ir para provas separadas por disciplina
        </Link>

        {teachers.map((teacher) => {
          const categories = getTestCategoriesOfTeacher(teacher);

          return (
            <div key={teacher.id}>
              <h2>{teacher.name}</h2>

              {categories.map((c) => (
                <div key={c.id}>
                  <h3 key={c.id}>{c.name}</h3>

                  {getTestsOfTeacher(teacher).map((td) => {
                    return td
                      .filter((t) => t.categoryId === c.id)
                      .map((test) => {
                        return (
                          <p
                            key={test.id}
                          >{`${test.name} (${test.discipline})`}</p>
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
