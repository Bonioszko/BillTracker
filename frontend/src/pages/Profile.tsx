import { UserContext, UserContextType } from "../context/UserContext.js";

import { useContext, useEffect, useState } from "react";

import Layout from "../components/Layouts/Layout.js";
import { Apartment } from "./InvoicesPage.js";
import { useTranslation } from "react-i18next";
import ApartmentCard from "../components/ApartmentCard.js";

type Summary = {
    _id: null;
    toPayByMeCount: number;
    toPayByTenantsCount: number;
    totalAmountToPay: number;
    totalAmountToReceive: number;
    difference: number;
};
function Profile() {
    const { user } = useContext(UserContext) as UserContextType;
    const { t } = useTranslation();
    const [apartments, setApartments] = useState<Apartment[]>();
    const [summary, setSummary] = useState<Summary>({
        _id: null,
        toPayByMeCount: 0,
        toPayByTenantsCount: 0,
        totalAmountToPay: 0,
        totalAmountToReceive: 0,
        difference: 0,
    });
    useEffect(() => {
        const FetchApartments = async () => {
            if (user) {
                const apartmentResoponse = await fetch(
                    `/api/apartment/${user._id}`
                );
                const data = await apartmentResoponse.json();
                if (apartmentResoponse.ok) {
                    setApartments(data.apartments);
                }
            }
        };
        const FetchSummary = async () => {
            if (user) {
                const apartmentResoponse = await fetch(
                    `/api/invoice/summary/${user._id}`
                );
                const data = await apartmentResoponse.json();
                if (apartmentResoponse.ok) {
                    setSummary(data.summary);
                }
            }
        };
        FetchApartments();
        FetchSummary();
    }, [user]);
    return (
        <Layout>
            {user ? (
                <div className="lg:w-1/2 flex flex-col gap-5 justify-center items-center animate-fadeIn">
                    {" "}
                    <h1 className="text-5xl font-bold pb-8 text-center">
                        {t("profile_page")}
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                        {" "}
                        <div className="text-2xl font-bold text-center">
                            {user.name}
                        </div>
                        <div className="flex  flex-col grow border-4 border-secondary-color p-2">
                            {" "}
                            <div className=" border-b-2">
                                <span className="font-bold">
                                    {" "}
                                    {t("invoices_to_pay")}
                                </span>

                                {summary?.toPayByMeCount}
                            </div>{" "}
                            <div className=" border-b-2">
                                <span className="font-bold">
                                    {t("invoices_to_be_paid")}
                                </span>
                                {summary?.toPayByTenantsCount}
                            </div>{" "}
                            <div className="border-b-2">
                                <span className="font-bold">
                                    {t("amount_to_pay")}
                                </span>
                                {summary?.totalAmountToPay}
                            </div>
                            <div className="border-b-2">
                                <div className=" ">
                                    {" "}
                                    <span className="font-bold">
                                        {t("amount_to_be_paid")}
                                    </span>
                                    {summary?.totalAmountToReceive}
                                </div>
                            </div>
                            <div border-b-2>
                                <div className="">
                                    {" "}
                                    <span className="font-bold">
                                        {t("difference")}
                                    </span>
                                    <span
                                        className={`${
                                            summary.difference >= 0
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        } px-1 rounded-lg`}
                                    >
                                        {summary.difference}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center">
                        Your apartments:
                    </h1>
                    <div className="grid grid-cols-apartments-grid  gap-5 w-full p-10 ">
                        {apartments?.map((apartment) => (
                            <ApartmentCard
                                name={apartment.name}
                                description={apartment.description}
                                tenant={apartment.tenant}
                            ></ApartmentCard>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-3xl font-bold">
                    To access this content you must be logged in
                </div>
            )}
        </Layout>
    );
}
export default Profile;
