import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";

import { Logo, Logout } from "../components";
import Form from "../styledComponents/Form";

export default function AddTest() {
  const [category, setCategory] = useState<number>(1);

  return (
    <div>
      <div className="header">
        <Logo />
        <Logout />
      </div>

      <Form className="add-test">
        <Link to="/tests-by-disciplines">
          Ir para provas separadas por disciplina
        </Link>
        <Link to="/tests-by-teachers">
          Ir para provas separadas por pessoa instrutora
        </Link>

        <TextField
          type="text"
          label="Título da prova"
          variant="outlined"
          placeholder="Título da prova"
          fullWidth
        />
        <TextField
          type="url"
          label="URL do PDF da prova"
          variant="outlined"
          placeholder="URL do PDF da prova"
          fullWidth
        />
        <TextField
          select
          label="Categoria"
          variant="outlined"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(+e.target.value)}
          fullWidth
        >
          <MenuItem key={1} value={1}>
            P1
          </MenuItem>
          <MenuItem key={2} value={2}>
            P2
          </MenuItem>
          <MenuItem key={3} value={3}>
            P3
          </MenuItem>
        </TextField>
        <TextField
          label="Disciplina"
          variant="outlined"
          placeholder="Disciplina"
          fullWidth
        />
        <TextField
          label="Pessoa Instrutora"
          variant="outlined"
          placeholder="Pessoa Instrutora"
          fullWidth
        />
      </Form>
    </div>
  );
}
