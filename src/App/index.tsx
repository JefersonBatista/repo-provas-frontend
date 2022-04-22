import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignUp, Login, TestsByDiscipline, TestsByTeacher } from "../pages";
import { AuthProvider } from "../contexts/AuthContext";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="tests-by-discipline" element={<TestsByDiscipline />} />
            <Route path="tests-by-teacher" element={<TestsByTeacher />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
