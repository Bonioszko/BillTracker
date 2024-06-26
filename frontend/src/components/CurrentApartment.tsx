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
import Bell from "../../public/bell.svg";
import AddInvoicePopup from "./AddInvoicePopup";
import PopupEmail from "./PopupEmail";
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
    // description,
    tenant,
    invoices,
    // owner,
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
    const [popupEmail, setPopupEmail] = useState(false);
    const [addInvoicePopup, setAddInvoicePopoup] = useState(false);

    useEffect(() => {
        const filteredInvoices = invoices.filter(
            (invoice) => invoice.category === currentCategory
        );

        setCurrentInvoices(filteredInvoices);
    }, [currentCategory, invoices, refresh]);
    const togglePaidByTenant = async (index: number, paidByTenant: boolean) => {
        const id = currentInvoices[index]._id;
        const response = await fetch(`/api/invoice/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ byTenant: paidByTenant }),
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
                <div className="flex flex-col items-center gap-4 p-5 animate-slideInFromBottom ">
                    <div className="flex justify-center items-center gap-5">
                        <div className="text-center  pt-4 flex flex-col">
                            <span className="text-3xl font-extrabold text-text-color">
                                {t("invoices")}
                            </span>
                            <span className="text-xl">{name}</span>
                        </div>
                        <div className="">
                            <img
                                src={Bell}
                                className="w-16 hover:scale-105 cursor-pointer"
                                onClick={() => setPopupEmail(true)}
                            />
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
                        {popupEmail && (
                            <PopupEmail
                                tenant={tenant}
                                onClose={() => setPopupEmail(false)}
                            ></PopupEmail>
                        )}
                        <div className="flex gap-1 justify-center">
                            {/* <TitleInvoices title={t("title")}></TitleInvoices> */}
                            <TitleInvoices title={t("amount")}></TitleInvoices>
                            <TitleInvoices title={t("date")}></TitleInvoices>
                            <TitleInvoices title={t("me")}></TitleInvoices>
                            <TitleInvoices title={t("I")}></TitleInvoices>
                        </div>
                        <div className="w-full bg-white h-1"></div>
                        <div className="flex flex-col gap-1  ">
                            {currentInvoices.length > 0 ? (
                                [...currentInvoices]
                                    .sort(
                                        (a, b) =>
                                            a.date.getTime() - b.date.getTime()
                                    )
                                    .map((invoice, index) => (
                                        <div className="flex gap-1 animate-slideInFromTop">
                                            <Cell content={invoice.amount} />
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
                                                                invoice.paidByTenant
                                                            }
                                                            onChange={() => {
                                                                setPopupTheir({
                                                                    visible:
                                                                        true,
                                                                    index: index,
                                                                });
                                                                setRefresh();
                                                            }}
                                                            className={`appearance-none w-6 h-6 border-2 outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                                        />
                                                        {popupTheir.index ===
                                                            index &&
                                                            popupTheir.visible ===
                                                                true && (
                                                                <Popup
                                                                    onClose={() =>
                                                                        setPopupTheir(
                                                                            {
                                                                                visible:
                                                                                    false,
                                                                                index: 0,
                                                                            }
                                                                        )
                                                                    }
                                                                    togglePaidByTenant={() =>
                                                                        togglePaidByTenant(
                                                                            popupTheir.index,
                                                                            true
                                                                        )
                                                                    }
                                                                    currValue={
                                                                        invoice.paidByTenant
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
                                                                    visible:
                                                                        true,
                                                                    index: index,
                                                                });

                                                                setRefresh();
                                                            }}
                                                            className={`appearance-none w-6 h-6 border-2  outline-none cursor-pointer bg-red-700 checked:bg-green-800`}
                                                        />
                                                        {popupMe.index ===
                                                            index &&
                                                            popupMe.visible ===
                                                                true && (
                                                                <Popup
                                                                    onClose={() =>
                                                                        setPopupMe(
                                                                            {
                                                                                visible:
                                                                                    false,

                                                                                index: 0,
                                                                            }
                                                                        )
                                                                    }
                                                                    togglePaidByTenant={() =>
                                                                        togglePaidByTenant(
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
                                className="w-10 lg:w-20 cursor-pointer"
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
