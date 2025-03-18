import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

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
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            {/* Navbar de navegación */}
            <Navbar onLogout={handleLogout} />
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/subjects" element={<SubjectsList />} />
                <Route path="/assignments" element={<AssignmentsList />} />
                <Route path="/submissions" element={<SubmissionsList />} />
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
