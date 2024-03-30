import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserContextType, UserContext } from "../context/UserContext";
import Layout from "../components/Layouts/Layout";
import ErrorForm from "../components/ErrorForm";
type Errors = {
    email?: string;
    password?: string;
};
function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [errors, setErrors] = useState<Errors>({
        email: "",
        password: "",
    });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
        };
        if (!formData.email) {
            newErrors.email = "Podaj email";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Podaj haslo";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const { email, password } = formData;
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
                    setUser(responseData);
                    setTimeout(() => {
                        navigate("/main");
                        toast.success(
                            "You are logged as: " + responseData.name
                        );
                    }, 1000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <Layout>
            <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-10 p-14 items-center rounded-lg">
                {!user ? (
                    <>
                        <h2 className="text-2xl">Login</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-between h-2/5 w-1/2 gap-5 bg-background-color p-5 rounded-lg"
                        >
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    {" "}
                                    <label htmlFor="email" className="text-xl">
                                        email
                                    </label>{" "}
                                    {errors.email && (
                                        <ErrorForm
                                            text={errors.email}
                                        ></ErrorForm>
                                    )}
                                </div>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="enter email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="p-2 rounded-xl border-2 border-black"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="password"
                                        className="text-xl"
                                    >
                                        password
                                    </label>
                                    {errors.password && (
                                        <ErrorForm
                                            text={errors.password}
                                        ></ErrorForm>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="enter password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="p-2 rounded-xl border-2 border-black"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-background-color p-2 rounded-lg border-2 border-cyan-500 hover:bg-secondary-color transform hover:scale-105"
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
            <ToastContainer />
        </Layout>
    );
}
export default Login;
