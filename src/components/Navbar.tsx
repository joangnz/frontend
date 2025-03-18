import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <div className="flex space-x-4">
                <Link to="/courses">Cursos</Link>
                <Link to="/subjects">Asignaturas</Link>
                <Link to="/assignments">Tareas</Link>
                <Link to="/submissions">Entregas</Link>
                <Link to="/messages">Mensajes</Link>
            </div>
            <LogoutButton onLogout={onLogout} />
        </nav>
    );
}