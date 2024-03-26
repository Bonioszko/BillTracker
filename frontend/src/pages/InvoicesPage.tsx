import { useState } from "react";
import CurrentApartment from "../components/CurrentApartment";

export const Categories = ["Czynsz", "Woda", "Prąd", "Spółdzielnia"];

export type Category = (typeof Categories)[number];

export type Invoice = {
    category: Category;
    name: string;
    date: Date;
    paidByMe: boolean;
    paidByLocator: boolean;
};
export type Apartment = {
    name: string;
    description: string;
    locator: string;
    invoices: Invoice[];
};

function InvoicesPage() {
    const [apartments, setApartments] = useState<Apartment[]>([
        {
            name: "Apartment 1",
            description: "This is a description for Apartment 1",
            locator: "Locator 1",
            invoices: [
                {
                    category: "Czynsz",
                    name: "Invoice 1",
                    date: new Date(),
                    paidByMe: true,
                    paidByLocator: false,
                },
                {
                    category: "Czynsz",
                    name: "Invoice 1",
                    date: new Date(),
                    paidByMe: true,
                    paidByLocator: false,
                },
                {
                    category: "Woda",
                    name: "Invoice 2",
                    date: new Date(),
                    paidByMe: false,
                    paidByLocator: true,
                },
            ],
        },
        {
            name: "Apartment 2",
            description: "This is a description for Apartment 2",
            locator: "Locator 2",
            invoices: [
                {
                    category: "Woda",
                    name: "Invoice 3",
                    date: new Date(),
                    paidByMe: true,
                    paidByLocator: false,
                },
                {
                    category: "Czynsz",
                    name: "Invoice 4",
                    date: new Date(),
                    paidByMe: false,
                    paidByLocator: true,
                },
            ],
        },
    ]);
    const [activeApartment, setActiveApartment] = useState(0);

    return (
        <div className="w-full min-h-scree bg-primary-color pt-20 flex flex-col items-center gap-4">
            <div className="w-10/12 h-20 bg-secondary-color flex justify-evenly items-center rounded-lg">
                {apartments.map((apartment, index) => (
                    <div
                        className={`text-2xl   font-bold p-2 rounded-lg cursor-pointer ${
                            index === activeApartment
                                ? "bg-third-color text-black"
                                : "text-text-color"
                        }`}
                        onClick={() => setActiveApartment(index)}
                    >
                        {" "}
                        {apartment.name}
                    </div>
                ))}
            </div>
            <div className="h-5/6 bg-third-color w-10/12  rounded-lg">
                {apartments.map((apartment, index) => (
                    <CurrentApartment
                        key={index}
                        name={apartment.name}
                        description={apartment.description}
                        locator={apartment.locator}
                        invoices={apartment.invoices}
                        active={index === activeApartment ? true : false}
                    ></CurrentApartment>
                ))}
            </div>
        </div>
    );
}

export default InvoicesPage;
