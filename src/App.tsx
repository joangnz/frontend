import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import GuestHeader from "./components/GuestHeader";
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
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));

  const handleLoginSuccess = (receivedToken: string, receivedId: string) => {
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("userId", receivedId);
    setToken(receivedToken);
    setUserId(receivedId);
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
        setUserId(null);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Router>
      <main id="main" className="min-h-screen bg-gray-100 p-4">
        {!token ? (
          <>
          <GuestHeader />
            <Routes>
              <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>

        ) : (
          <>
            {/* Navbar de navegación */}
            <Navbar onLogout={handleLogout} />
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<ProtectedRoute token={token}><CoursesList /></ProtectedRoute>} />
                <Route path="/subjects" element={<ProtectedRoute token={token}><SubjectsList /></ProtectedRoute>} />
                <Route path="/assignments" element={<ProtectedRoute token={token}><AssignmentsList /></ProtectedRoute>} />
                <Route path="/submissions" element={<ProtectedRoute token={token}><SubmissionsList /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute token={token}><MessageList /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}
      </main>
    </Router>
  );
}

export default App;
