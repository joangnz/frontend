interface LogoutButtonProps {
    onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    return (
        <button onClick={onLogout} className="bg-red-600 text-white p-2 rounded hover:bg-red500" >
            Logout
        </button>
    )
}