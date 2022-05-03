import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function PageSelector({ loading }: { loading: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0",
      }}
    >
      <Button
        disabled={loading}
        onClick={() => navigate("/tests-by-disciplines")}
      >
        Disciplinas
      </Button>
      <Button disabled={loading} onClick={() => navigate("/tests-by-teachers")}>
        Pessoas Instrutoras
      </Button>
      <Button disabled={loading} onClick={() => navigate("/add-test")}>
        Adicionar
      </Button>
    </div>
  );
}
