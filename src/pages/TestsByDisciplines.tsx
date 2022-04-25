import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { Button } from "../styledComponents/authComponents";

export default function TestsByDisciplines() {
  const navigate = useNavigate();

  const { token, removeToken } = useAuth();

  const [terms, setTerms] = useState<any[] | null>(null);

  async function getTestsByDisciplines() {
    try {
      const { data } = await api.test.getTestsByDisciplines(token);
      const { terms: termsData } = data;

      setTerms(termsData);
    } catch (error) {
      alert(
        "Não foi possível listar as provas.\nPor favor, recarregue a página"
      );
    }
  }

  function getDisciplines(term: {
    disciplines: { id: number; name: string }[];
  }) {
    return term.disciplines;
  }

  /* function getTestCategories(term: {
    disciplines: any[];
  }): { id: number; name: string }[] {
    const testCategories = {};

    term.disciplines.forEach((discipline) => {
      discipline.teachersDisciplines[0].tests.forEach((test) => {
        if (!testCategories[test.category.name]) {
          testCategories[test.category.name] = true;
        }
      });
    });
    return Object.keys(testCategories);
  } */

  function getTestsOfDiscipline(discipline) {
    return discipline.teachersDisciplines.map((td) => {
      return td.tests.map((test) => {
        const { id, name } = test;
        return { id, name, teacher: td.teacher.name };
      });
    });
  }

  function getTestCategoriesOfDiscipline(discipline) {
    const categoryTable = {};

    discipline.teachersDisciplines.forEach((td) => {
      td.tests.forEach((test) => {
        const c = test.category;
        if (!categoryTable[c.id]) {
          categoryTable[c.id] = c;
        }
      });
    });

    return Object.values(categoryTable).sort((a, b) => a.id - b.id);
  }

  function logout() {
    removeToken();
    navigate("/");
  }

  useEffect(() => {
    getTestsByDisciplines();
  }, []);

  if (terms === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="tests">
      <Button variant="outlined" onClick={logout}>
        Sair
      </Button>

      <Link to="/tests-by-teachers">
        Ir para provas separadas por pessoa instrutora
      </Link>

      {terms.map((term, index) => (
        <div>
          <h2 key={index}>{`${term.number}º Período`}</h2>
          {true && (
            <div>
              {getDisciplines(term).map(
                (discipline: { id: number; name: string }) => {
                  // console.log(getTestCategoriesOfDiscipline(discipline));
                  return (
                    <div key={discipline.id}>
                      <h3 key={discipline.id}>{discipline.name}</h3>
                      {getTestsOfDiscipline(discipline).map((td) => {
                        return td.map((test) => {
                          return (
                            <h4
                              key={test.id}
                            >{`${test.name} (${test.teacher})`}</h4>
                          );
                        });
                      })}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
