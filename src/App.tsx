import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
// Authentication
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import Register from "./components/Register";

// Lists
import CoursesList from "./components/Lists/CoursesList";
import SubjectsList from "./components/Lists/SubjectsList";
import AssignmentsList from "./components/Lists/AssignmentsList";
import SubmissionsList from "./components/Lists/SubmissionsList";
import MessageList from "./components/Lists/MessagesList";

import "./App.css";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const handleLoginSuccess = (receivedToken: string, receivedId: string) => {
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("userId", receivedId);
    setToken(receivedToken);
    setId(receivedId);
  }

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
        localStorage.removeItem("userId");
        setId(null);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {!token ? (
          <Routes>
            <Route path="/" element={<Login
              onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            {/* Navbar de navegación */}
            <nav className="bg-blue-600 text-white p-4 flex justifybetween">
              <div className="flex space-x-4">
                <Link to="/courses">Cursos</Link>
                <Link to="/subjects">Asignaturas</Link>
                <Link to="/assignments">Tareas</Link>
                <Link to="/submissions">Entregas</Link>
                <Link to="/messages">Mensajes</Link>
              </div>
              <LogoutButton onLogout={handleLogout} />
            </nav>
            <div className="p-4">
              <Routes>
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/subjects" element={<SubjectsList />} />
                <Route path="/assignments" element={<AssignmentsList />}
                />
                <Route path="/submissions" element={<SubmissionsList />}
                />
                <Route path="/messages" element={<MessageList />} />
                <Route path="*" element={<Navigate to="/courses" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
