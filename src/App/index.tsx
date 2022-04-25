import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignUp, Login, TestsByDisciplines, TestsByTeachers } from "../pages";
import { AuthProvider } from "../contexts/AuthContext";
import logo from "../logo.png";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <img src={logo} alt="Logo" />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route
              path="tests-by-disciplines"
              element={<TestsByDisciplines />}
            />
            <Route path="tests-by-teachers" element={<TestsByTeachers />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
