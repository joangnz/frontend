import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Log.css";
import "./Login.css";

interface LoginProps {
    onLoginSuccess: (token: string, id: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Petición POST a /api/login
        fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Invalid credentials");
                }
                return res.json();
            })
            .then((data) => {
                // data.token y data.user vendrán del backend
                onLoginSuccess(data.token, data.user.id);
                console.log(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div id="login" className="log max-w-sm mx-auto p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500">
                    Login
                </button>
            </form>

            <p>¿No tienes cuenta? <Link to="/register">¡Registrate!</Link></p>
        </div>
    );
}