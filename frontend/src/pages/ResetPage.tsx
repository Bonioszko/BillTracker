import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
// import { response } from "express";
import { toast } from "react-toastify";

function ResetPage() {
    const { token } = useParams();
    const [okToken, setOkToken] = useState(false);
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
    return (
        <Layout>
            {okToken ? (
                <div className="w-10/12 h-4/5 bg-secondary-color flex flex-col justify-center gap-5 sm:gap-10 p-14 items-center rounded-lg ">
                    <h2 className="text-3xl font-bold">Provide new Password</h2>
                    <form className="flex flex-col justify-between h-2/5 sm:w-1/2 max-w-2xl gap-5 bg-background-color p-5 rounded-lg animate-slideInFromBottom">
                        <input
                            type="password"
                            name="password"
                            className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color "
                        ></input>
                        <input
                            type="password"
                            name="password"
                            className="p-2 rounded-xl border-2 border-black focus:outline-none focus:border-secondary-color "
                        ></input>
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
