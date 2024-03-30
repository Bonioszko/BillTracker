import ErrorForm from "./ErrorForm";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AddApartmentPopoupProps {
    onClose: () => void;
    refresh: () => void;
}
type Errors = {
    name?: string;
    description?: string;
    locator?: string;
};
const AddApartmentPopoup: React.FC<AddApartmentPopoupProps> = ({
    onClose,
    refresh,
}) => {
    const { user, setUser } = useContext(UserContext) as UserContextType;
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        locator: "",
    });
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            description: "",
            locator: "",
        };
        if (!formData.name) {
            newErrors.name = "Podaj nazwe";
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = "Podaj opis mieszkania";
            isValid = false;
        }
        if (!formData.locator) {
            newErrors.locator = "Podaj lokatora";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const { name, description, locator } = formData;
            const response = await fetch(`/api/apartment/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, locator }),
            });
            if (response.ok) {
                const data = await response.json();
                onClose();
                refresh();
                toast.success("Dodano apartament");
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
            {" "}
            <div className="w-1/2 h-1/2 bg-secondary-color rounded-lg flex flex-col justify-around items-center p-20">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex">
                            {" "}
                            <label htmlFor="fname">Nazwa mieszkania</label>
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
                            <label htmlFor="description">
                                Opis mieszkania
                            </label>{" "}
                            {errors.description && (
                                <ErrorForm text="Podaj opis"></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="p-2 rounded-lg"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex">
                            {" "}
                            <label htmlFor="locator">Lokator</label>{" "}
                            {errors.locator && (
                                <ErrorForm text="Podaj lokatora"></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="locator"
                            name="locator"
                            className="p-2 rounded-lg"
                            value={formData.locator}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    locator: e.target.value,
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
export default AddApartmentPopoup;
