import { useState, useContext, ClassAttributes } from "react";
import { UserContextType, UserContext } from "../context/UserContext";

interface LogoutProps {
    className?: string;
}

export default function Logout({ className }: LogoutProps) {
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
            <button onClick={handleLogout} className={` ${className}`}>
                Logout
            </button>
        </>
    );
}
