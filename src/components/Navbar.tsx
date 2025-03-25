import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

import "./Navbar.css";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    return (
        <nav id="nav" className="text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-8">
                <div id="home-holder" className="flex">
                    <img id="home-logo" className="text-logo" src="/favicon.png" alt="" />
                    <Link className="text-2xl font-bold" to="/">Laredu</Link>
                </div>
                <Link className="hover:text-gray-300" to="/courses">Cursos</Link>
                <Link className="hover:text-gray-300" to="/subjects">Asignaturas</Link>
                <Link className="hover:text-gray-300" to="/assignments">Tareas</Link>
                <Link className="hover:text-gray-300" to="/submissions">Entregas</Link>
                <Link className="hover:text-gray-300" to="/messages">Mensajes</Link>
            </div>
            <LogoutButton onLogout={onLogout} />
        </nav>
    );
}