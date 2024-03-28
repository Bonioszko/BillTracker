import { useState } from "react";
function SignIn() {
    const [data, setData] = useState({
        name: "",
        email: "",

        password: "",
    });
    const handleSubmit = async (e) => {};
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
        </div>
    );
}
export default SignIn;
