import { useTranslation } from "react-i18next";

interface PopupProps {
    onClose: () => void;
    togglePaidByLocator: () => void;
    currValue: boolean;
}

const Popup: React.FC<PopupProps> = ({
    onClose,
    togglePaidByLocator,
    currValue,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-between items-center p-20">
                <h1 className="font-bold text-2xl">
                    {t("are_you_sure")}
                    {currValue ? t("cancel_payment") : t("approve_payment")}
                </h1>
                <div className="flex justify-between  w-1/2 gap-5">
                    {" "}
                    <button
                        className="bg-green-600 p-2 border-2 border-black rounded-lg font-bold w-40"
                        onClick={() => {
                            togglePaidByLocator();
                            onClose();
                        }}
                    >
                        {t("submit")}
                    </button>
                    <button
                        className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold w-40"
                        onClick={() => onClose()}
                    >
                        {t("cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Popup;
