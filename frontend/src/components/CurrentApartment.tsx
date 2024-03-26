import { useEffect, useState } from "react";
import { Invoice, Apartment, Categories } from "../pages/InvoicesPage";
import Cell from "./Cell";
import TitleInvoices from "./TitleInvoices";
import water from "../../public/icon (2).svg";
import Popup from "./Popup";
import Checked from "../../public/checkbox-checked-svgrepo-com.svg";
import { set } from "mongoose";

interface CurrentApartmentProps extends Apartment {
    active: boolean;
}

interface CurrentApartmentProps extends Apartment {
    active: boolean;
}

const CurrentApartment: React.FC<CurrentApartmentProps> = ({
    name,
    description,
    locator,
    invoices,
    active,
}) => {
    const [currentCategory, setCurrentCategory] = useState(Categories[0]);
    const [currentInvoices, setCurrentInvoices] = useState<Invoice[]>([]);
    useEffect(() => {
        const filteredInvoices = invoices.filter(
            (invoice) => invoice.category === currentCategory
        );
        setCurrentInvoices(filteredInvoices);
    }, [currentCategory, invoices]);
    const togglePaidByLocator = (index: number, paidByLocator: boolean) => {
        setCurrentInvoices((prevInvoices) => {
            // Create a new copy of the invoice you want to update
            const invoiceToUpdate = { ...prevInvoices[index] };
            if (paidByLocator) {
                invoiceToUpdate.paidByLocator = !invoiceToUpdate.paidByLocator;
            } else {
                invoiceToUpdate.paidByMe = !invoiceToUpdate.paidByMe;
            }

            const updatedInvoices = [
                ...prevInvoices.slice(0, index),
                invoiceToUpdate,
                ...prevInvoices.slice(index + 1),
            ];
            return updatedInvoices;
        });
    };
    return (
        <>
            {active ? (
                <div className="flex flex-col items-center gap-4 p-5 animate-slideInFromLeft">
                    <Popup></Popup>
                    <h1 className="text-2xl font-semibold">{name}</h1>
                    <div>
                        {description} lokator: {locator}
                    </div>
                    <div className="flex gap-10 w-full items-center justify-center">
                        {Categories.map((category, index) => (
                            <div
                                onClick={() => setCurrentCategory(category)}
                                className={`font-bold p-1 rounded-lg cursor-pointer w-50 text-center text-2xl flex gap-2  ${
                                    Categories[index] === currentCategory
                                        ? "bg-secondary-color "
                                        : ""
                                }`}
                            >
                                {category}
                                <img src={water} className="w-10"></img>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <TitleInvoices title="Tytuł"></TitleInvoices>
                            <TitleInvoices title="Data"></TitleInvoices>
                            <TitleInvoices title=" Mi"></TitleInvoices>
                            <TitleInvoices title="Ja"></TitleInvoices>
                        </div>
                        <div className="w-full bg-white h-1"></div>
                        {currentInvoices.length > 0 ? (
                            currentInvoices.map((invoice, index) => (
                                <div className="flex gap-2">
                                    <Cell content={invoice.name} />
                                    <Cell
                                        content={invoice.date.toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            }
                                        )}
                                    />
                                    <Cell
                                        content={
                                            <input
                                                type="checkbox"
                                                checked={invoice.paidByLocator}
                                                onChange={() =>
                                                    togglePaidByLocator(
                                                        index,
                                                        true
                                                    )
                                                }
                                                className={`appearance-none w-6 h-6 border-2 border-third-color outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                            />
                                        }
                                    />
                                    <Cell
                                        content={
                                            <input
                                                type="checkbox"
                                                checked={invoice.paidByMe}
                                                onChange={() =>
                                                    togglePaidByLocator(
                                                        index,
                                                        false
                                                    )
                                                }
                                                className={`appearance-none w-6 h-6 border-2 border-third-color outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                            />
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-2xl">
                                You do not have invoices for that category
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default CurrentApartment;
