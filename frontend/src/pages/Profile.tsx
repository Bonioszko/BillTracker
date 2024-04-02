import { UserContext, UserContextType } from "../context/UserContext.js";

import { useContext, useEffect, useState } from "react";
import Logout from "../components/Logout.js";
import Layout from "../components/Layouts/Layout.js";
import { Apartment } from "./InvoicesPage.js";
import ApartmentCard from "../components/ApartmentCard.js";

function Profile() {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [apartments, setApartments] = useState<Apartment[]>();

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
                console.log(data);
            }
        };
        FetchApartments();
        FetchSummary();
    }, [user]);
    return (
        <Layout>
            {user ? (
                <div className="w-1/2 flex flex-col gap-5 justify-center items-center">
                    {" "}
                    <div className="text-2xl font-bold">{user.name}</div>
                    <h1 className="text-2xl font-bold">Your apartments:</h1>
                    <div className="grid grid-cols-apartments-grid  gap-5 w-full p-2 ">
                        {apartments?.map((apartment) => (
                            <ApartmentCard
                                name={apartment.name}
                                description={apartment.description}
                                locator={apartment.locator}
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
