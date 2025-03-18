interface LogoutButtonProps {
    onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    return (
        <button onClick={onLogout} className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-500" >
            Logout
        </button>
    )
}