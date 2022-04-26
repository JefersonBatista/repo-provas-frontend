import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { Logo } from "../components";
import { Form, AuthInput, Button } from "../styledComponents/authComponents";

export default function Login() {
  const navigate = useNavigate();

  const { saveToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange({
    target,
  }: {
    target: { name: string; value: string };
  }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.auth.login(formData);
      const { token } = data;
      saveToken(token);

      navigate("/tests-by-disciplines");
    } catch (error: any) {
      alert(error.response.data);
      setLoading(false);
    }
  }

  return (
    <>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <div>
          <Link to={loading ? "#" : "/sign-up"}>Não possuo cadastro</Link>

          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </Form>
    </>
  );
}
