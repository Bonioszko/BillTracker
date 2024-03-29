import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserContextType, UserContext } from "../context/UserContext";
import {} from "react";

function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
            const responseData = await response.json();

            if (responseData.error) {
                toast.success(responseData.error);
            } else {
                toast.success("You are logged as: " + responseData.name);
                setTimeout(() => {
                    navigate("/profile");
                    setUser(null);
                }, 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="w-full h-screen bg-background-color  flex flex-col items-center justify-center gap-4">
            <ToastContainer />
            <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-10 p-14 items-center rounded-lg">
                {!user ? (
                    <>
                        <h2 className="text-2xl">Login</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-between h-2/5 bg-background-color p-5 rounded-lg"
                        >
                            <div className="flex flex-col gap-4">
                                <label htmlFor="email" className="text-xl">
                                    email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="enter email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                    className="p-2 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col gap-4 ">
                                <label htmlFor="password" className="text-xl">
                                    password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="enter password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                        })
                                    }
                                    className="p-2 rounded-xl"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-background-color p-2 rounded-lg border-2 border-cyan-500"
                            >
                                {" "}
                                submit
                            </button>
                        </form>
                    </>
                ) : (
                    <div>You are already logged in</div>
                )}
            </div>
        </div>
    );
}
export default Login;
