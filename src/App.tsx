import { useState } from "react";
import "./App.css";

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
    <div className="min-h-screen bg-gray-100 p-4">
      {!token ? (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <Register />
        </>
      ) : (
        <div>
          <p className="text-xl">Bienvenido a Laredu</p>
          <LogoutButton onLogout={handleLogout} />

          {/* Lists */}
          <CoursesList />
          <SubjectsList />
          <AssignmentsList />
          <SubmissionsList />
          <MessageList />
        </div>
      )}
    </div>
  );
}

export default App;
