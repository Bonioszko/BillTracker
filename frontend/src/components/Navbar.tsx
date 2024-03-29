import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="h-14  w-full flex justify-between items-center p-5 border-b-2 border-gray-700">
            <div className="flex gap-3">
                {" "}
                <Link to="/login" className="text-xl font-bold rounded-lg p-2">
                    Login
                </Link>
                <Link to="/signin" className="text-xl font-bold rounded-lg p-2">
                    Sigin
                </Link>
            </div>

            <Link to="/" className="text-xl font-bold rounded-lg p-2">
                Home
            </Link>

            <Link to="/profile" className="text-xl font-bold rounded-lg p-2">
                Profile
            </Link>
            <Link to="/main" className="text-xl font-bold rounded-lg p-2">
                Invoices
            </Link>
        </div>
    );
}
