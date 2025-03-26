import { Link } from "react-router-dom";

import "./GuestHeader.css";

export default function GuestHeader() {
    return (
        <div id="guest-header" className="flex justify-center align-center p-4 mb-6">
            <img src="/favicon.png" id="guest-logo" alt="" />
            <Link to="/" className="text-4xl font-bold">Laredu</Link>
        </div>
    );
}