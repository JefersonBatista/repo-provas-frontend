import { useEffect, useState } from "react";
import { Input } from "@mui/material";

import api from "../services/api";
import {
  TestsByDisciplinesType,
  TermWithTestsData,
  DisciplineWithTestsData,
  Category,
} from "../services/types";
import useAuth from "../hooks/useAuth";
import { Logo, Logout, PageSelector } from "../components";

export default function TestsByDisciplines() {
  const { token } = useAuth();

  const [terms, setTerms] = useState<TermWithTestsData[] | null>(null);
  const [filter, setFilter] = useState<string>("");

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
    return term.disciplines.filter((discipline) =>
      discipline.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function getTestsOfDiscipline(discipline: DisciplineWithTestsData) {
    return discipline.teachersDisciplines.map((td) => {
      return td.tests.map((test) => ({ ...test, teacher: td.teacher.name }));
    });
  }

  function getTestCategoriesOfDiscipline(discipline: DisciplineWithTestsData) {
    const ids = new Set<number>();
    const categories = [] as Category[];

    discipline.teachersDisciplines.forEach((td) => {
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
      getTestsByDisciplines();
      window.open(pdfUrl);
    } catch (error: any) {
      alert(error.response.data);
    }
  }

  useEffect(() => {
    getTestsByDisciplines();
  }, []);

  if (terms === null) {
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
          placeholder="Filtre por disciplina"
          autoFocus
          fullWidth
          style={{ alignSelf: "center", marginBottom: "20px", height: "20px" }}
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        />

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
                                      {` (${test.teacher}) [${test.viewCount} visualizações]`}
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
