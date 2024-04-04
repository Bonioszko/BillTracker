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
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none  "
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-11/12 lg:w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-between items-center  p-20 border-2 border-text-color animate-slideInFromBottom">
                <h1 className="text-xl font-bold">
                    {t("are_you_sure")}
                    <span className="font-extrabold">
                        {" "}
                        {currValue ? t("cancel_payment") : t("approve_payment")}
                    </span>
                </h1>
                <div className="flex justify-between  sm:w-1/2 w-3/4">
                    {" "}
                    <button
                        className="bg-primary-color p-2 rounded-lg border-2 cursor-pointer  border-black font-bold transform hover:scale-105"
                        onClick={() => {
                            togglePaidByLocator();
                            onClose();
                        }}
                    >
                        {t("submit")}
                    </button>
                    <button
                        className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold  transform hover:scale-105"
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
