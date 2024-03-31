import { Link } from "react-router-dom";
import Icon from "../../public/iconBills.svg";
import Logout from "./Logout";
import { useContext } from "react";
import { UserContextType, UserContext } from "../context/UserContext";
import LocaleSwitcher from "../i18n/Switcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { user } = useContext(UserContext) as UserContextType;
    const { t } = useTranslation();
    return (
        <div className="h-16  w-full flex items-center justify-center  border-b-2 border-gray-700 ">
            <div className="flex w-10/12 justify-between items-center">
                {" "}
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="text-3xl font-bold flex justify-center items-center gap-5">
                        PaymentPal <img src={Icon} width="60px"></img>
                    </div>
                    {user ? (
                        <Logout className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color"></Logout>
                    ) : (
                        <Link
                            to="/login"
                            className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color text-center hover:text-background-color"
                        >
                            {t("login")}
                        </Link>
                    )}
                    <Link
                        to="/signin"
                        className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color hover:text-background-color"
                    >
                        {t("sign_in")}
                    </Link>
                </div>
                <div className="flex gap-20">
                    {" "}
                    <LocaleSwitcher></LocaleSwitcher>
                    <h1>{t("hello_world")}</h1>
                    <Link
                        to="/"
                        className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color hover:text-background-color"
                    >
                        {t("home")}
                    </Link>
                    <Link
                        to="/profile"
                        className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color hover:text-background-color"
                    >
                        {t("profile")}
                    </Link>
                    <Link
                        to="/main"
                        className="text-xl font-bold rounded-lg p-2 hover:bg-secondary-color hover:text-background-color"
                    >
                        {t("invoices")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
