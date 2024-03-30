import { useEffect, useState, useContext } from "react";
import CurrentApartment from "../components/CurrentApartment";
import Navbar from "../components/Navbar";
import AddApartmentPopoup from "../components/AddApartmentPopup";
import { UserContextType, UserContext } from "../context/UserContext";
import PlusIcon from "../../public/plus.svg";
import Layout from "../components/Layouts/Layout";
export const Categories = ["Czynsz", "Woda", "Prąd", "Spółdzielnia"];

export type Category = (typeof Categories)[number];

export type Invoice = {
    category: Category;
    apartment: string;
    name: string;
    date: Date;
    paidByMe: boolean;
    paidByLocator: boolean;
    _id: string;
};
export type Apartment = {
    name: string;
    _id: string;
    owner: string;
    description: string;
    locator: string;
    invoices: Invoice[];
};

function InvoicesPage() {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [apartments, setApartments] = useState<Apartment[]>();
    const [activeApartment, setActiveApartment] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [addApartmentPopupBool, setAddApartmentPopupBool] = useState(false);
    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Fetch invoices
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
            <div className="w-10/12 overflow-x-auto h-30 bg-secondary-color flex justify-evenly items-center rounded-lg">
                <div className="overflow-x-auto flex items-center gap-2 px-10">
                    {apartments &&
                        apartments.map((apartment, index) => (
                            <div
                                className={`text-2xl font-bold p-2 rounded-lg cursor-pointer max-w-44 text-center ${
                                    index === activeApartment
                                        ? "bg-primary-color text-black"
                                        : "text-text-color"
                                }`}
                                onClick={() => setActiveApartment(index)}
                            >
                                {apartment.name}
                            </div>
                        ))}
                </div>
                <div className="flex justify-center w-20">
                    <img
                        src={PlusIcon}
                        alt=""
                        className="w-20 cursor-pointer"
                        onClick={() => setAddApartmentPopupBool(true)}
                    />
                </div>
            </div>
            <div className="h-5/6 bg-secondary-color w-10/12  rounded-lg">
                {apartments &&
                    apartments.map((apartment, index) => (
                        <CurrentApartment
                            key={index}
                            name={apartment.name}
                            _id={apartment._id}
                            description={apartment.description}
                            locator={apartment.locator}
                            invoices={apartment.invoices}
                            owner={apartment.owner}
                            active={index === activeApartment ? true : false}
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
        </Layout>
    );
}

export default InvoicesPage;
