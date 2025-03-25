import "./LogoutButton.css"

interface LogoutButtonProps {
    onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    return (
        <button id="logoutButton" onClick={onLogout} className="" >
            Logout
        </button>
    )
}