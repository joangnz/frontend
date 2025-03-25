import { Link } from "react-router-dom";

import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div id="dashboard" className="p-6">
            <h1 className="text-3xl font-bold mb-6">Bienvenido a Laredu</h1>
            <div className="grid grid-cols-2 gap-4">
                <Link to="/courses" className="p-4 bg-blue-500 rounded shadow hover:bg-blue-600">
                    📖 Ver Cursos
                </Link>
                <Link to="/subjects" className="p-4 bg-green-500 rounded shadow hover:bg-green-600">
                    📚 Ver Asignaturas
                </Link>
                <Link to="/assignments" className="p-4 bg-purple-500 rounded shadow hover:bg-purple-600">
                    📝 Ver Tareas
                </Link>
                <Link to="/submissions" className="p-4 bg-yellow-500 rounded shadow hover:bg-yellow-600">
                    📤 Ver Entregas
                </Link>
                <Link to="/messages" className="p-4 bg-red-500 rounded shadow hover:bg-red-600">
                    💬 Ver Mensajes
                </Link>
            </div>
        </div>
    )
}