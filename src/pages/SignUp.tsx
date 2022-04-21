import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import Form from "../styledComponents/authComponents/Form";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange({
    target,
  }: {
    target: { name: string; value: string };
  }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Você inseriu senhas diferentes");
      return;
    }

    const { email, password } = formData;
    const newUserData = { email, password };

    try {
      await api.user.signUp(newUserData);

      navigate("/");
    } catch (error: any) {
      alert(error.response.data);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="repeatPassword"
        placeholder="Confirme sua senha"
        value={formData.repeatPassword}
        onChange={handleChange}
      />

      <Link to="/">Já possuo cadastro</Link>

      <button type="submit">Cadastrar</button>
    </Form>
  );
}
