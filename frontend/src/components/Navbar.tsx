import { Link } from "react-router-dom";
import Icon from "../../public/iconBills.svg";
import Logout from "./Logout";
import { useContext } from "react";
import { UserContextType, UserContext } from "../context/UserContext";
export default function Navbar() {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    return (
        <div className="h-16  w-full flex items-center justify-center  border-b-2 border-gray-700 ">
            <div className="flex w-10/12 justify-between items-center">
                {" "}
                <div className="flex gap-3 items-center">
                    {" "}
                    <div className="text-3xl font-bold flex justify-center items-center gap-5">
                        Payment Pal <img src={Icon} width="60px"></img>
                    </div>
                    {user ? (
                        <Logout className="text-xl font-bold rounded-lg p-2"></Logout>
                    ) : (
                        <Link
                            to="/login"
                            className="text-xl font-bold rounded-lg p-2"
                        >
                            Login
                        </Link>
                    )}
                    <Link
                        to="/signin"
                        className="text-xl font-bold rounded-lg p-2"
                    >
                        Signin
                    </Link>
                </div>
                <div className="flex gap-20">
                    {" "}
                    <Link to="/" className="text-xl font-bold rounded-lg p-2">
                        Home
                    </Link>
                    <Link
                        to="/profile"
                        className="text-xl font-bold rounded-lg p-2"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/main"
                        className="text-xl font-bold rounded-lg p-2"
                    >
                        Invoices
                    </Link>
                </div>
            </div>
        </div>
    );
}
