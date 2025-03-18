import React, { useEffect, useState } from "react";

interface Assignment {
    id: number;
    title: string;
    due_date: string;
    subject_id: number;
}
export default function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/assignments", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setAssignments(data))
            .catch(() => setError("Error al obtener las tareas"));
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Tareas</h2>
            <ul className="space-y-2">
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="p-2 border rounded bgwhite shadow">
                        <strong>{assignment.title}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}