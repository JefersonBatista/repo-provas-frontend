import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { Form, AuthInput, Button } from "../styledComponents/authComponents";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      await api.auth.login(formData);

      navigate("/tests-by-discipline");
    } catch (error: any) {
      alert(error.response.data);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <AuthInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <AuthInput
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
      />

      <div>
        <Link to="/">Não possuo cadastro</Link>

        <Button type="submit">Entrar</Button>
      </div>
    </Form>
  );
}
