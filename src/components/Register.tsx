import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Log.css";
import "./Register.css";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Por defecto, estudiante
    const [message, setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        })
            .then((res) => res.json())
            .then(() => setMessage("Usuario registrado con éxito"))
            .catch(() => setMessage("Error en el registro"));
    };

    return (
        <div id="register" className="log max-w-sm mx-auto p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Registro</h2>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="text"
                    placeholder="Nombre"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="email" placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="role" className="sr-only">Role</label>
                <select
                    id="role"
                    className="border p-2 rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Estudiante</option>
                    <option value="teacher">Profesor</option>
                </select>
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    Registrarse
                </button>
            </form>
            <p>¿Ya tienes cuenta? <Link to="/">¡Inicia Sesión!</Link></p>
        </div>
    );
} 