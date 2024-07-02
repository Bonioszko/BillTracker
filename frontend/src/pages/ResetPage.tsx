import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
// import { response } from "express";
import { toast } from "react-toastify";

function ResetPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [okToken, setOkToken] = useState(false);
    const [errors, setErrors] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
    });
    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch(`/api/auth/token/${token}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    toast.error("Invalid Token");
                } else {
                    const tokenReturned = await response.json();
                    console.log(tokenReturned);

                    setOkToken(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        checkToken();
    }, [token]);
    const checkForm = () => {
        if (
            formData.newPassword !== "" &&
            formData.password !== "" &&
            formData.password === formData.newPassword
        ) {
            return true;
        } else {
            return false;
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkForm()) {
            setErrors("");
            const { password } = formData;
            const response = await fetch("/api/auth/newPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    token,
                }),
            });
            if (response.ok) {
                toast.success("Password reseted successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } else {
            setErrors("Password must be the same and cannot be null ");
        }
    };
    return (
        <Layout>
            {okToken ? (
                <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-5 sm:gap-10 p-14 items-center rounded-lg ">
                    <h2 className="text-3xl font-bold text-center">
                        Provide new Password
                    </h2>
                    <form
                        className="flex flex-col justify-between h-2/5 sm:w-1/2 max-w-2xl gap-5 bg-background-color p-5 rounded-lg animate-slideInFromBottom"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-1 ">
                            <label>New password</label>{" "}
                            <input
                                type="password"
                                name="password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color "
                            ></input>
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label>Confirm password</label>{" "}
                            <input
                                type="password"
                                name="newPassword"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color "
                            ></input>
                        </div>
                        <h1 className="text-red-500 ">{errors}</h1>
                        <button
                            type="submit"
                            className=" w-full bg-background-color p-2 rounded-lg border-2 border-text-color hover:bg-secondary-color hover:text-text-color transition-colors duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div>Invalid Token</div>
            )}
        </Layout>
    );
}

export default ResetPage;
