import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
function SignIn() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = data;

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const responseData = await response.json();

            // Handle response data as needed
            console.log(responseData);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success(responseData.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <Layout>
            <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-10 p-14 items-center rounded-lg">
                <h2 className="text-2xl">Sign In</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between h-3/5 bg-background-color p-5 rounded-lg"
                >
                    <div className="flex flex-col gap-4">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="enter name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                            className="p-2 rounded-xl"
                        />
                    </div>
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
            </div>{" "}
            <ToastContainer />
        </Layout>
    );
}
export default SignIn;
