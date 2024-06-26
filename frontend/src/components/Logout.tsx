import { useContext } from "react";
import { UserContextType, UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface LogoutProps {
    className?: string;
}

export default function Logout({ className }: LogoutProps) {
    const { setUser } = useContext(UserContext) as UserContextType;
    const { t } = useTranslation();
    const navigate = useNavigate();
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
            toast.success("You are logged out");
            navigate("/login");
        } else {
            // Handle any errors
            console.error("Logout failed");
        }
    };

    return (
        <>
            <button onClick={handleLogout} className={` ${className}`}>
                {t("logout")}
            </button>
        </>
    );
}
