import { useEffect, useState } from "react";

interface Assignment {
    id: number;
    title: string;
    description: string;
    due_date: string;
    subject_id: number;
    created_at: string;
    updated_at: string;
}

export default function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found. Please log in.");
            return;
        }
        fetch("http://127.0.0.1:8000/api/assignments", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch assignments");
                }
                return res.json();
            })
            .then((data: Assignment[]) => {
                setAssignments(data);
            })
            .catch((err) => setError(err.message));
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
                        <strong>{assignment.title}</strong> - {assignment.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}