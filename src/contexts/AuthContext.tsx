import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  token: string;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  saveToken: (token) => {},
  removeToken: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const retrievedToken = localStorage.getItem("repo-provas-token");
  const [token, setToken] = useState(retrievedToken || "");

  useEffect(() => {
    if (token) {
      navigate("/tests-by-disciplines");
    } else {
      navigate("/");
    }
  }, []);

  function saveToken(token: string) {
    setToken(token);
    localStorage.setItem("repo-provas-token", token);
  }

  function removeToken() {
    setToken("");
    localStorage.removeItem("repo-provas-token");
  }

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
