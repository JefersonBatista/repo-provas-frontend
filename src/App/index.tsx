import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  SignUp,
  Login,
  TestsByDisciplines,
  TestsByTeachers,
  AddTest,
} from "../pages";
import { AuthProvider } from "../contexts/AuthContext";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/tests-by-disciplines"
              element={<TestsByDisciplines />}
            />
            <Route path="/tests-by-teachers" element={<TestsByTeachers />} />
            <Route path="/add-test" element={<AddTest />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
