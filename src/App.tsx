import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!token ? (<Login onLoginSuccess={handleLoginSuccess} />) : (
        <p className="text-xl">You are logged in. Token: {token}</p>
      )}
    </div>
  );
}
export default App;
