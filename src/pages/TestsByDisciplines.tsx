import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import {
  TestsByDisciplinesType,
  TermWithTestsData,
  DisciplineWithTestsData,
} from "../services/test";
import useAuth from "../hooks/useAuth";
import { Button } from "../styledComponents/authComponents";

export default function TestsByDisciplines() {
  const navigate = useNavigate();

  const { token, removeToken } = useAuth();

  const [terms, setTerms] = useState<TermWithTestsData[] | null>(null);

  async function getTestsByDisciplines() {
    try {
      const { data } = await api.test.getTestsByDisciplines(token);
      const { terms: termsData } = data as TestsByDisciplinesType;

      setTerms(termsData);
    } catch (error) {
      alert(
        "Não foi possível listar as provas.\nPor favor, recarregue a página"
      );
    }
  }

  function getDisciplines(term: TermWithTestsData) {
    return term.disciplines;
  }

  function getTestsOfDiscipline(discipline: DisciplineWithTestsData) {
    return discipline.teachersDisciplines.map((td) => {
      return td.tests.map((test) => {
        const { id, name } = test;
        return {
          categoryId: test.category.id,
          id,
          name,
          teacher: td.teacher.name,
        };
      });
    });
  }

  function getTestCategoriesOfDiscipline(discipline: DisciplineWithTestsData) {
    const categoryTable: { [key: number]: { id: number; name: string } } = {};

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
              {getDisciplines(term).map((discipline) => {
                const categories = getTestCategoriesOfDiscipline(discipline);

                return (
                  <div key={discipline.id}>
                    <h3 key={discipline.id}>{discipline.name}</h3>

                    {categories.map((c) => (
                      <div key={c.id}>
                        <h4 key={c.id}>{c.name}</h4>

                        {getTestsOfDiscipline(discipline).map((td) => {
                          return td
                            .filter((t) => t.categoryId === c.id)
                            .map((test) => {
                              return (
                                <p
                                  key={test.id}
                                >{`${test.name} (${test.teacher})`}</p>
                              );
                            });
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
