import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">email</label>
                        <input
                            type="email"
                            placeholder="enter email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">password</label>
                        <input
                            type="password"
                            placeholder="enter password"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit"> submit</button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}
export default SignIn;
