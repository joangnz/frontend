import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";

import CoursesList from "./components/Lists/CoursesList";
import AssignmentsList from "./components/Lists/AssignmentsList";

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
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
    })
    .catch((err) => console.error(err));
  }

  return (
    <div className="bg-gray-100 p-4">
      {token ? (
        <div>
          <p className="text-xl">Token: {token}</p>
          <LogoutButton onLogout={handleLogout} />
          <CoursesList />
          <AssignmentsList />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
export default App;
