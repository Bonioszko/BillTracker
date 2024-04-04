import { Link } from "react-router-dom";
import Icon from "../../public/iconBills.svg";
import X from "../../public/X.svg";
import Yes from "../../public/Yes.svg";

function LandingPage() {
    return (
        <div className="w-full h-screen bg-background-color  flex flex-col items-start px-6 sm:px-20 py-5 gap-20">
            <div className="w-full flex justify-between items-center">
                {" "}
                <div className="text-xl sm:text-4xl font-bold flex justify-center items-center gap-5">
                    Payment Pal <img src={Icon} className="w-12 sm:w-24"></img>
                </div>
                <div>
                    <Link
                        to="/login"
                        className="sm:text-2xl font-bold bg-secondary-color p-3 rounded-3xl block transform hover:scale-110 "
                    >
                        Login
                    </Link>
                </div>
            </div>

            <div className="w-full flex flex-col gap-10 justify-center items-center">
                <h1 className="text-3xl lg:text-5xl font-bold lg:w-3/4 text-center text-secondary-color">
                    Perfect tool for every landlord
                </h1>
                <div className="flex lg:flex-row flex-col gap-20 transform ">
                    <div className="text-white bg-gradient-to-r from-red-400 to-red-700 flex flex-col gap-7 p-7 rounded-lg w-80 sm:w-96">
                        <div className="flex items-center gap-3 text-xl font-semibold">
                            <img src={X} width="50px"></img>
                            No more boring excel files
                        </div>
                        <div className="flex items-center gap-3 text-xl font-semibold">
                            <img src={X} width="50px"></img>No more file
                            cabinets
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-300 to-green-400 flex flex-col gap-5 p-7 rounded-lg w-80 sm:w-96">
                        <div className="flex items-center gap-3 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>All properties in
                            one place
                        </div>
                        <div className="flex items-center gap-3 text-xl font-semibold">
                            <img src={Yes} width="50px"></img>Easily keep track
                            of everything
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-32  w-full">
                    <div className="w-1/5">
                        Never miss a paymnent ever again
                    </div>
                    <div className="flex text-xl w-2/5 p-5 rounded-2xl bg-secondary-color">
                        Welcome to our professional platform for managing
                        accounts for apartment renters. Our user-friendly
                        service simplifies the process of keeping track of
                        rental expenses and payments. With our innovative tools,
                        you can effortlessly manage your bills, invoices, and
                        financial records in one convenient place. Our platform
                        offers a secure and efficient way to organize your
                        finances, ensuring transparency and accuracy in all your
                        transactions. Say goodbye to the hassle of manually
                        tracking your expenses and let our service streamline
                        the process for you. Join our platform today to
                        experience the convenience of efficient account
                        management for apartment renters. Take control of your
                        finances and enjoy peace of mind knowing that your
                        accounts are in order. Trust us to help you stay on top
                        of your rental payments effortlessly.
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LandingPage;
