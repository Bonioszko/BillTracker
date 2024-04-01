import { Link } from "react-router-dom";
import Icon from "../../public/iconBills.svg";
import X from "../../public/X.svg";
import Yes from "../../public/Yes.svg";
import { useTranslation } from "react-i18next";
function LandingPage() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-screen bg-background-color  flex flex-col items-start px-20 py-5 gap-20">
            <div className="w-full flex justify-between items-center">
                {" "}
                <div className="text-xl sm:text-4xl font-bold flex justify-center items-center gap-5">
                    Payment Pal <img src={Icon} width="100px"></img>
                </div>
                <div>
                    <Link
                        to="/login"
                        className="text-2xl font-bold bg-secondary-color p-3 rounded-3xl block transform hover:scale-110 "
                    >
                        Login
                    </Link>
                </div>
            </div>

            <div className="w-full flex flex-col gap-10 justify-center items-center">
                <h1 className="text-3xl font-bold">
                    You are a property owner, we can help you
                </h1>
                <div>
                    <div>Never miss a paymnent ever again</div>
                    <div></div>
                </div>
                <div className="flex w-2/5 text-2xl bg-secondary-color p-5 rounded-2xl">
                    Introducing - a convenient app that helps you keep track of
                    who has paid your bills (such as water and electricity), and
                    who you owe money to. With PaymentPal, you can easily
                    organize and categorize your bills, set reminders for due
                    dates, and track payments made by various individuals. Say
                    goodbye to confusion and misunderstandings when it comes to
                    your poperties - PaymentPal has got you covered! Stay on top
                    of your financial obligations and payments with this
                    user-friendly app today.
                </div>
                <div className="flex lg:flex-row flex-col gap-20 transform ">
                    <div className="text-white bg-gradient-to-r from-red-400 to-red-700 flex flex-col gap-5 p-7 rounded-lg">
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={X} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={X} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={X} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={X} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={X} width="50px"></img>No need for boring
                            excel files
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-300 to-green-400 flex flex-col gap-5 p-7 rounded-lg">
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>No need for boring
                            excel files
                        </div>
                        <div className="flex items-center gap-50 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>No need for boring
                            excel files
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LandingPage;
