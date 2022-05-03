import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import {
  Category,
  Discipline,
  Teacher,
  CreateTestData,
} from "../services/types";
import { Logo, Logout, PageSelector } from "../components";
import Form from "../styledComponents/Form";

export default function AddTest() {
  const { token } = useAuth();

  const [formData, setFormData] = useState<CreateTestData>({
    name: "",
    pdfUrl: "",
    categoryId: 0,
    disciplineId: 0,
    teacherId: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      await api.test.add(token, formData);

      setFormData({
        name: "",
        pdfUrl: "",
        categoryId: 0,
        disciplineId: 0,
        teacherId: 0,
      });

      setLoading(false);
    } catch (error: any) {
      alert(error.response.data);
      setLoading(false);
    }
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  async function getCategories() {
    try {
      const { data } = (await api.category.getAll(token)) as {
        data: Category[];
      };
      setCategories(data);
    } catch {
      alert(
        "Não foi possível obter as categorias de provas\nPor favor, recarregue a página"
      );
    }
  }

  async function getDisciplines() {
    try {
      const { data } = (await api.discipline.getAll(token)) as {
        data: Discipline[];
      };
      setDisciplines(data);
    } catch {
      alert(
        "Não foi possível obter as categorias de provas\nPor favor, recarregue a página"
      );
    }
  }

  async function getTeachers() {
    try {
      const { data } = (await api.teacher.getByDisciplineId(
        token,
        formData.disciplineId
      )) as {
        data: Teacher[];
      };
      setTeachers(data);
    } catch {
      alert(
        "Não foi possível obter as categorias de provas\nPor favor, recarregue a página"
      );
    }
  }

  useEffect(() => {
    getCategories();
    getDisciplines();
  }, []);

  useEffect(() => {
    if (formData.disciplineId) getTeachers();
  }, [formData.disciplineId]);

  return (
    <div>
      <div className="header">
        <Logo />
        <Logout />
      </div>

      <PageSelector loading={loading} />

      <Form className="add-test" onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Título da prova"
          variant="outlined"
          placeholder="Título da prova"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        />
        <TextField
          type="url"
          name="pdfUrl"
          label="URL do PDF da prova"
          variant="outlined"
          placeholder="URL do PDF da prova"
          value={formData.pdfUrl}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        />
        <TextField
          select
          name="categoryId"
          label="Categoria"
          variant="outlined"
          placeholder="Categoria"
          value={formData.categoryId || ""}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name="disciplineId"
          label="Disciplina"
          variant="outlined"
          placeholder="Disciplina"
          value={formData.disciplineId || ""}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        >
          {disciplines.map((discipline) => (
            <MenuItem key={discipline.id} value={discipline.id}>
              {discipline.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name="teacherId"
          label="Pessoa Instrutora"
          variant="outlined"
          placeholder="Pessoa Instrutora"
          value={formData.teacherId || ""}
          onChange={handleChange}
          disabled={loading || !formData.disciplineId}
          fullWidth
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.name}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Form>
    </div>
  );
}
