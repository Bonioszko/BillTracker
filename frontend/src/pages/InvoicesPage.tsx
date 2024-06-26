import { useEffect, useState, useContext } from "react";
import CurrentApartment from "../components/CurrentApartment";
import AddApartmentPopoup from "../components/AddApartmentPopup";
import { UserContextType, UserContext } from "../context/UserContext";
import PlusIcon from "../../public/plus.svg";
import Layout from "../components/Layouts/Layout";

export const Categories = ["Rent", "Water", "Electricity", "Cooperative"];

export type Category = (typeof Categories)[number];

export type Invoice = {
    category: Category;
    apartment: string;
    amount: number;
    name: string;
    date: Date;
    paidByMe: boolean;
    paidByTenant: boolean;
    _id: string;
};
export type Apartment = {
    name: string;
    _id: string;
    owner: string;
    description: string;
    tenant: string;
    invoices: Invoice[];
};

function InvoicesPage() {
    const { user } = useContext(UserContext) as UserContextType;
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [activeApartment, setActiveApartment] = useState(0);

    const [refresh, setRefresh] = useState(false);
    const [addApartmentPopupBool, setAddApartmentPopupBool] = useState(false);
    const toggleRefresh = () => {
        setRefresh(!refresh);
    };
    // const [isLoading, setIsLoading] = useState(true); // Add this line

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const invoiceResponse = await fetch(`/api/invoice/${user._id}`);
                const invoiceData = await invoiceResponse.json();
                let invoices: Invoice[] = [];
                if (invoiceResponse.ok) {
                    invoices = invoiceData.invoices;
                }

                // Fetch apartments
                const apartmentResponse = await fetch(
                    `/api/apartment/${user._id}`
                );
                const apartmentData = await apartmentResponse.json();
                let apartments: Apartment[] = [];
                if (apartmentResponse.ok) {
                    apartments = apartmentData.apartments;
                    const apartmentsWithInvoices = apartments.map(
                        (apartment) => ({
                            ...apartment,
                            invoices: invoices
                                .filter(
                                    (invoice) =>
                                        invoice.apartment === apartment._id
                                )
                                .map((invoice) => ({
                                    ...invoice,
                                    date: new Date(invoice.date),
                                })),
                        })
                    );

                    setApartments(apartmentsWithInvoices);
                }
            }
        };

        fetchData();
    }, [user, refresh]);
    return (
        <Layout>
            {user ? (
                <>
                    <div className="w-11/12 lg:w-10/12 overflow-x-auto h-15 bg-secondary-color flex justify-center items-center rounded-lg  ">
                        <div className="overflow-x-auto flex items-center gap-5 py-0  px-2 lg:px-10 h-20 lg:h-28 white-scrollbar">
                            {apartments.length > 0 ? (
                                apartments.map((apartment, index) => (
                                    <div
                                        className={`lg:text-2xl font-bold p-2 rounded-lg cursor-pointer max-w-96 text-center ${
                                            index === activeApartment
                                                ? "bg-primary-color text-black transition-colors duration-500 ease-in-out"
                                                : "text-text-color"
                                        }`}
                                        onClick={() =>
                                            setActiveApartment(index)
                                        }
                                    >
                                        {apartment.name}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xl font-bold">
                                    Add some apartments
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center w-20 lg:w-20">
                            {apartments && (
                                <img
                                    src={PlusIcon}
                                    alt=""
                                    className="w-6 lg:w-20 cursor-pointer"
                                    onClick={() =>
                                        setAddApartmentPopupBool(true)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="h-5/6 bg-secondary-color w-11/12 lg:w-10/12  rounded-lg animate-slideInFromBottom ">
                        {/* <div className="text-center  pt-4 flex flex-col">
                            <span className="text-3xl font-extrabold text-text-color">
                                {t("invoices")}
                            </span>
                            <span className="text-xl">
                                {apartments[activeApartment]?.name}
                            </span>
                        </div> */}

                        {apartments &&
                            apartments.map((apartment, index) => (
                                <CurrentApartment
                                    key={index}
                                    name={apartment.name}
                                    _id={apartment._id}
                                    description={apartment.description}
                                    tenant={apartment.tenant}
                                    invoices={apartment.invoices}
                                    owner={apartment.owner}
                                    active={
                                        index === activeApartment ? true : false
                                    }
                                    setRefresh={toggleRefresh}
                                    refresh={refresh}
                                ></CurrentApartment>
                            ))}
                    </div>
                    {addApartmentPopupBool && (
                        <AddApartmentPopoup
                            onClose={() => setAddApartmentPopupBool(false)}
                            refresh={() => toggleRefresh()}
                        ></AddApartmentPopoup>
                    )}
                </>
            ) : (
                <div className="text-3xl font-bold">
                    To access this content you must be logged in
                </div>
            )}
        </Layout>
    );
}

export default InvoicesPage;
