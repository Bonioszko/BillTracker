import { useState, useContext } from "react";
import { UserContextType, UserContext } from "../context/UserContext";
export default function Logout() {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const handleLogout = async () => {
        // Make a request to your server's logout endpoint
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            setUser(null);
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            // Handle any errors
            console.error("Logout failed");
        }
    };
    return (
        <>
            <button onClick={handleLogout} className="p-2 roudned-lg">
                Logout
            </button>
        </>
    );
}
