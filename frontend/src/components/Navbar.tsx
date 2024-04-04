import { Link } from "react-router-dom";
import Icon from "../../public/iconBills.svg";
import Logout from "./Logout";
import { useContext } from "react";
import { UserContextType, UserContext } from "../context/UserContext";
import LocaleSwitcher from "../i18n/Switcher";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Hamburger from "../../public/Hamburger.svg";

export default function Navbar() {
    const { user } = useContext(UserContext) as UserContextType;
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`h-16 w-full flex  lg:justify-center border-b-2 border-gray-700 ${
                isOpen && isMobile ? "fixed z-50 h-screen bg-white" : ""
            }`}
        >
            <div
                className={`flex flex-col sm:flex-row w-full lg:w-10/12  lg:justify-between lg:items-center ${
                    isOpen && isMobile && "h-screen "
                }`}
            >
                {" "}
                <div className="flex justify-between w-full p-5">
                    {" "}
                    <div className="lg:text-3xl font-bold flex justify-center items-center gap-5">
                        PaymentPal{" "}
                        <img src={Icon} className="w-8 lg:w-16"></img>
                    </div>
                    {isMobile && (
                        <button onClick={toggleMenu}>
                            <img
                                src={Hamburger}
                                alt="Menu"
                                width="40px"
                                height="40px"
                            />
                        </button>
                    )}
                </div>
                {(isOpen || !isMobile) && (
                    <div
                        className={`flex flex-col sm:flex-row gap-2 lg:gap-5 items-center justify-center ${
                            isOpen ? "animate-slideInFromTop" : ""
                        }`}
                    >
                        {user ? (
                            <Logout className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color text-center hover:text-background-color"></Logout>
                        ) : (
                            <Link
                                to="/login"
                                className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color text-center hover:text-background-color"
                            >
                                {t("login")}
                            </Link>
                        )}
                        <Link
                            to="/signin"
                            className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color hover:text-background-color text-center"
                        >
                            {t("sign_in")}
                        </Link>

                        <Link
                            to="/profile"
                            className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color hover:text-background-color"
                        >
                            {t("profile")}
                        </Link>
                        <Link
                            to="/main"
                            className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color hover:text-background-color"
                        >
                            {t("invoices")}
                        </Link>
                        <Link
                            to="/"
                            className="lg:text-xl font-bold rounded-lg p-2 transition-colors duration-300 ease-in-out  hover:bg-secondary-color hover:text-background-color"
                        >
                            {t("home")}
                        </Link>
                        <LocaleSwitcher></LocaleSwitcher>
                    </div>
                )}
            </div>
        </div>
    );
}
