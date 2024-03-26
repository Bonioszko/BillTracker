interface AddInvoicePopupProps {
    onClose: () => void;
    category: string;
}

const AddInvoicePopup: React.FC<AddInvoicePopupProps> = ({
    onClose,
    category,
}) => {
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-between items-center p-20">
                <h1>{category}</h1>
                <button
                    className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold w-40"
                    onClick={() => onClose()}
                >
                    Anuluj
                </button>
            </div>
        </div>
    );
};
export default AddInvoicePopup;
