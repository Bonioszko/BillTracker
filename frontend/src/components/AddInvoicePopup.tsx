import { useState } from "react";

interface AddInvoicePopupProps {
    onClose: () => void;
    category: string;
}
type Errors = {
    name?: string;
    date?: string;
};
const AddInvoicePopup: React.FC<AddInvoicePopupProps> = ({
    onClose,
    category,
}) => {
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setformData] = useState({ name: "", date: "" });
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            date: "",
        };
        if (!formData.name) {
            newErrors.name = "Podaj nazwe";
            isValid = false;
        }
        if (!formData.date) {
            newErrors.date = "Podaj date";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-around items-center p-20">
                <h1 className="text-xl">
                    Dodaj fakturę dla{" "}
                    <span className="font-bold">{category}</span>
                </h1>
                <form action="" className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        {" "}
                        <label htmlFor="fname">Nazwa faktury</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        {" "}
                        <label htmlFor="date">Data faktury</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        {" "}
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-primary-color p-2 rounded-lg w-40"
                        />{" "}
                        <button
                            className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold w-40"
                            onClick={() => onClose()}
                        >
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddInvoicePopup;
