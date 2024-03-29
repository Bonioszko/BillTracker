import { useEffect, useState, useContext } from "react";
import CurrentApartment from "../components/CurrentApartment";
import Navbar from "../components/Navbar";
import { UserContextType, UserContext } from "../context/UserContext";
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
    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

    // useEffect(() => {
    //     const fetchUserApartments = async () => {
    //         const response = await fetch(`/api/apartment/${user?._id}`);
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log(data.apartments);
    //             setApartments(data.apartments);
    //         }
    //     };
    //     if (user) {
    //         fetchUserApartments();
    //     }
    // });
    // useEffect(() => {
    //     const fetchUserInvoices = async () => {
    //         const response = await fetch(`/api/invoice/${user?._id}`);
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log(data);
    //         }
    //     };
    //     if (user) {
    //         fetchUserInvoices();
    //     }
    // });
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
                    console.log(refresh);
                    setApartments(apartmentsWithInvoices);
                }
            }
        };

        fetchData();
    }, [user, refresh]);
    return (
        <Layout>
            <div className="w-10/12 h-20 bg-secondary-color flex justify-evenly items-center rounded-lg">
                {apartments &&
                    apartments.map((apartment, index) => (
                        <div
                            className={`text-2xl   font-bold p-2 rounded-lg cursor-pointer ${
                                index === activeApartment
                                    ? "bg-primary-color text-black"
                                    : "text-text-color"
                            }`}
                            onClick={() => setActiveApartment(index)}
                        >
                            {" "}
                            {apartment.name}
                        </div>
                    ))}
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
        </Layout>
    );
}

export default InvoicesPage;
