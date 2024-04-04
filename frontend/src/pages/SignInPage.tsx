import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../components/ErrorForm";
import Layout from "../components/Layouts/Layout";

import { useTranslation } from "react-i18next";
type Errors = {
    name?: string;
    email?: string;
    password?: string;
};
function SignIn() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Errors>({
        name: "",
        email: "",
        password: "",
    });
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
            name: "",
        };
        if (!formData.email) {
            newErrors.email = t("give_email");
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = t("give_password");
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = t("password_6");
            isValid = false;
        }
        if (!formData.name) {
            newErrors.name = t("give_name");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const { name, email, password } = formData;

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
        }
    };
    return (
        <Layout>
            <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-5 sm:gap-10 p-5  sm:p-14 items-center rounded-lg ">
                <h2 className="text-3xl font-bold text-center">
                    {t("sign_in")}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between h-3/5 sm:w-1/2 max-w-2xl bg-background-color p-5 rounded-lg gap-5 animate-slideInFromBottom"
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="name" className="text-xl">
                                {t("name")}
                            </label>
                            {errors.name && (
                                <ErrorForm text={errors.name}></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="enter name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="email" className="text-xl">
                                Email
                            </label>
                            {errors.email && (
                                <ErrorForm text={errors.email}></ErrorForm>
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
                            className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color"
                        />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-xl">
                                {t("password")}
                            </label>
                            {errors.password && (
                                <ErrorForm text={errors.password}></ErrorForm>
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
                            className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-background-color p-2 rounded-lg border-2 border-text-color hover:bg-secondary-color hover:text-text-color transition-colors duration-300 ease-in-out"
                    >
                        {" "}
                        submit
                    </button>
                </form>
            </div>{" "}
        </Layout>
    );
}
export default SignIn;
