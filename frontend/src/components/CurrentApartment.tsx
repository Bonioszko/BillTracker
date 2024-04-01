import { useEffect, useState } from "react";
import { Invoice, Apartment, Categories } from "../pages/InvoicesPage";
import Cell from "./Cell";
import TitleInvoices from "./TitleInvoices";
import water from "../../public/water.svg";
import rent from "../../public/Bill.svg";
import electricity from "../../public/electricity.svg";
import cooperative from "../../public/house.svg";
import Popup from "./Popup";
import PlusIcon from "../../public/plus.svg";
import AddInvoicePopup from "./AddInvoicePopup";
import { useTranslation } from "react-i18next";
interface CurrentApartmentProps extends Apartment {
    active: boolean;
    setRefresh: () => void;
    refresh: boolean;
}

interface CurrentApartmentProps extends Apartment {
    active: boolean;
}
const categoryIcons = new Map([
    ["Water", water],
    ["Rent", rent],
    ["Electricity", electricity],
    ["Cooperative", cooperative],
]);
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
    const { t } = useTranslation();
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
    const togglePaidByLocator = async (
        index: number,
        paidByLocator: boolean
    ) => {
        const id = currentInvoices[index]._id;
        const response = await fetch(`/api/invoice/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ byLocator: paidByLocator }),
        });
        if (response.ok) {
            setRefresh();
        } else {
            console.error(`Error updating invoice: ${response.status}`);
        }
    };
    return (
        <>
            {active ? (
                <div className="flex flex-col items-center gap-4 p-5 ">
                    <div className="sm:w-1/2 flex justify-between sm:px-6">
                        {" "}
                        <h1 className="text-2xl font-semibold">{name}</h1>
                        <div className="text-xl"> {description}</div>
                        <div className="text-xl">
                            {t("locator")}: {locator}
                        </div>
                    </div>

                    <div className="flex gap-2 lg:gap-10  lg:w-full items-center justify-center">
                        {Categories.map((category, index) => (
                            <div
                                onClick={() => setCurrentCategory(category)}
                                className={`font-bold p-1 rounded-lg cursor-pointer w-50 text-center lg:text-2xl flex flex-col lg:flex-row gap-2 justify-center items-center  ${
                                    Categories[index] === currentCategory
                                        ? "bg-secondary-color text-text-color"
                                        : ""
                                }`}
                            >
                                {t(category.toLowerCase())}
                                <img
                                    src={categoryIcons.get(category)}
                                    className={`w-10 ${
                                        Categories[index] === currentCategory
                                            ? "rotate-12"
                                            : ""
                                    }`}
                                ></img>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-1 justify-center">
                            <TitleInvoices title={t("title")}></TitleInvoices>
                            <TitleInvoices title={t("date")}></TitleInvoices>
                            <TitleInvoices title={t("me")}></TitleInvoices>
                            <TitleInvoices title={t("I")}></TitleInvoices>
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
                                                            setRefresh();
                                                        }}
                                                        className={`appearance-none w-6 h-6 border-2 outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
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
                                                        onChange={() => {
                                                            setPopupMe({
                                                                visible: true,
                                                                index: index,
                                                            });

                                                            setRefresh();
                                                        }}
                                                        className={`appearance-none w-6 h-6 border-2  outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
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
                                    {t("not_invoice")}
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
