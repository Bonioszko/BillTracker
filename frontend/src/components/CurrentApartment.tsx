import { useEffect, useState } from "react";
import { Invoice, Apartment, Categories } from "../pages/InvoicesPage";
import Cell from "./Cell";
import TitleInvoices from "./TitleInvoices";
import water from "../../public/icon (2).svg";
import Popup from "./Popup";
import PlusIcon from "../../public/plus.svg";
import AddInvoicePopup from "./AddInvoicePopup";
import Checked from "../../public/checkbox-checked-svgrepo-com.svg";
import { set } from "mongoose";

interface CurrentApartmentProps extends Apartment {
    active: boolean;
    setRefresh: () => void;
    refresh: boolean;
}

interface CurrentApartmentProps extends Apartment {
    active: boolean;
}

const CurrentApartment: React.FC<CurrentApartmentProps> = ({
    name,
    description,
    locator,
    invoices,
    owner,
    _id,
    active,
    setRefresh,
    refresh,
}) => {
    const [currentCategory, setCurrentCategory] = useState(Categories[0]);

    const [currentInvoices, setCurrentInvoices] = useState<Invoice[]>([]);
    const [popupMe, setPopupMe] = useState({ visible: false, index: 0 });
    const [popupTheir, setPopupTheir] = useState({ visible: false, index: 0 });
    const [addInvoicePopup, setAddInvoicePopoup] = useState(false);

    useEffect(() => {
        const filteredInvoices = invoices.filter(
            (invoice) => invoice.category === currentCategory
        );
        setCurrentInvoices(filteredInvoices);
    }, [currentCategory, invoices, refresh]);
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
                <div className="flex flex-col items-center gap-4 p-5 ">
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
                                        ? "bg-secondary-color text-text-color"
                                        : ""
                                }`}
                            >
                                {category}
                                <img src={water} className="w-10"></img>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-1">
                            <TitleInvoices title="Tytuł"></TitleInvoices>
                            <TitleInvoices title="Data"></TitleInvoices>
                            <TitleInvoices title=" Mi"></TitleInvoices>
                            <TitleInvoices title="Ja"></TitleInvoices>
                        </div>
                        <div className="w-full bg-white h-1"></div>
                        <div className="flex flex-col gap-1">
                            {currentInvoices.length > 0 ? (
                                currentInvoices.map((invoice, index) => (
                                    <div className="flex gap-1">
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
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            invoice.paidByLocator
                                                        }
                                                        onChange={() => {
                                                            setPopupTheir({
                                                                visible: true,
                                                                index: index,
                                                            });
                                                        }}
                                                        className={`appearance-none w-6 h-6 border-2 border-third-color outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                                    />
                                                    {popupTheir.visible && (
                                                        <Popup
                                                            onClose={() =>
                                                                setPopupTheir({
                                                                    visible:
                                                                        false,
                                                                    index: 0,
                                                                })
                                                            }
                                                            togglePaidByLocator={() =>
                                                                togglePaidByLocator(
                                                                    popupTheir.index,
                                                                    true
                                                                )
                                                            }
                                                            currValue={
                                                                invoice.paidByLocator
                                                            }
                                                        ></Popup>
                                                    )}
                                                </>
                                            }
                                        />
                                        <Cell
                                            content={
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            invoice.paidByMe
                                                        }
                                                        onChange={() =>
                                                            setPopupMe({
                                                                visible: true,
                                                                index: index,
                                                            })
                                                        }
                                                        className={`appearance-none w-6 h-6 border-2 border-third-color outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                                    />
                                                    {popupMe.visible && (
                                                        <Popup
                                                            onClose={() =>
                                                                setPopupMe({
                                                                    visible:
                                                                        false,

                                                                    index: 0,
                                                                })
                                                            }
                                                            togglePaidByLocator={() =>
                                                                togglePaidByLocator(
                                                                    popupMe.index,
                                                                    false
                                                                )
                                                            }
                                                            currValue={
                                                                invoice.paidByMe
                                                            }
                                                        ></Popup>
                                                    )}
                                                </>
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
                        <div className="flex justify-center">
                            <img
                                src={PlusIcon}
                                alt=""
                                className="w-20 cursor-pointer"
                                onClick={() => {
                                    setAddInvoicePopoup(true);
                                }}
                            />
                        </div>
                    </div>
                    {addInvoicePopup && (
                        <AddInvoicePopup
                            onClose={() => setAddInvoicePopoup(false)}
                            category={currentCategory}
                            apartment_id={_id}
                            refresh={() => setRefresh()}
                        ></AddInvoicePopup>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default CurrentApartment;
