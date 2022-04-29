import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@mui/material";

import api from "../services/api";
import { Logo } from "../components";
import Form from "../styledComponents/Form";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
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

    if (formData.password !== formData.repeatPassword) {
      alert("Você inseriu senhas diferentes");
      setLoading(false);
      return;
    }

    const { email, password } = formData;
    const newUserData = { email, password };

    try {
      await api.user.signUp(newUserData);

      navigate("/");
    } catch (error: any) {
      alert(error.response.data);
      setLoading(false);
    }
  }

  return (
    <>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
        />
        <Input
          type="password"
          name="repeatPassword"
          placeholder="Confirme sua senha"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
        />

        <div>
          <Link to={loading ? "#" : "/"}>Já possuo cadastro</Link>

          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </Form>
    </>
  );
}
