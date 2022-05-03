import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function PageSelector({
  page,
  loading,
}: {
  page: string;
  loading: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "30px 0",
      }}
    >
      <Button
        variant={page === "disciplines" ? "contained" : "outlined"}
        disabled={loading}
        onClick={() => navigate("/tests-by-disciplines")}
      >
        Disciplinas
      </Button>
      <Button
        variant={page === "teachers" ? "contained" : "outlined"}
        disabled={loading}
        onClick={() => navigate("/tests-by-teachers")}
      >
        Pessoas Instrutoras
      </Button>
      <Button
        variant={page === "add" ? "contained" : "outlined"}
        disabled={loading}
        onClick={() => navigate("/add-test")}
      >
        Adicionar
      </Button>
    </div>
  );
}
