import { FormEvent, useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import ErrorForm from "./ErrorForm";
import "react-toastify/dist/ReactToastify.css";
interface AddInvoicePopupProps {
    onClose: () => void;
    category: string;
    apartment_id: string;
    refresh: () => void;
}
type Errors = {
    name?: string;
    date?: string;
};
const AddInvoicePopup: React.FC<AddInvoicePopupProps> = ({
    onClose,
    category,
    apartment_id,
    refresh,
}) => {
    const [errors, setErrors] = useState<Errors>({});
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        category: category,
        apartment: apartment_id,
    });
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            const { name, date, category, apartment } = formData;
            const response = await fetch(`/api/invoice/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, date, category, apartment }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success("Dodano fakturę");
                onClose();
                refresh();
            } else {
                console.log("Error:", response.status, response.statusText);
                toast.error("Nie dodano faktury");
            }
        }
    };
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-around items-center p-20">
                <h1 className="text-xl">
                    Dodaj fakturę dla
                    <span className="font-bold"> {category}</span>
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex">
                            {" "}
                            <label htmlFor="fname">Nazwa faktury</label>
                            {errors.name && (
                                <ErrorForm text="Podaj nazwe"></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="p-2 rounded-lg"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex">
                            {" "}
                            <label htmlFor="date">Data faktury</label>{" "}
                            {errors.date && (
                                <ErrorForm text="Podaj date"></ErrorForm>
                            )}
                        </div>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="p-2 rounded-lg"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value,
                                })
                            }
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
            <ToastContainer></ToastContainer>
        </div>
    );
};
export default AddInvoicePopup;
