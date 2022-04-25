import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { Button } from "../styledComponents/authComponents";

export default function TestsByTeacher() {
  const navigate = useNavigate();

  const { token, removeToken } = useAuth();

  const [teachers, setTeachers] = useState<any[] | null>(null);

  async function getTestsByTeachers() {
    try {
      const { data } = await api.test.getTestsByTeachers(token);
      const { teachers: teachersData } = data;

      setTeachers(teachersData);
    } catch (error) {
      alert(
        "Não foi possível listar as provas.\nPor favor, recarregue a página"
      );
    }
  }

  function getTestsOfTeacher(teacher) {
    return teacher.teachersDisciplines.map((td) => {
      return td.tests.map((test) => {
        const { id, name } = test;
        return { id, name, discipline: td.discipline.name };
      });
    });
  }

  function logout() {
    removeToken();
    navigate("/");
  }

  useEffect(() => {
    getTestsByTeachers();
  }, []);

  if (teachers === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="tests">
      <Button variant="outlined" onClick={logout}>
        Sair
      </Button>

      <Link to="/tests-by-disciplines">
        Ir para provas separadas por disciplina
      </Link>

      {teachers.map((teacher) => (
        <div>
          <h2>{teacher.name}</h2>

          {/* <div>
            {teacher.teachersDisciplines.map(
              (td: { discipline: any }, index: number) => (
                <div key={index}>
                  <h3 key={td.discipline.id}>{td.discipline.name}</h3>
                </div>
              )
            )}
          </div> */}
          {getTestsOfTeacher(teacher).map((td) => {
            return td.map((test) => {
              return (
                <h4 key={test.id}>{`${test.name} (${test.discipline})`}</h4>
              );
            });
          })}
        </div>
      ))}
    </div>
  );
}
