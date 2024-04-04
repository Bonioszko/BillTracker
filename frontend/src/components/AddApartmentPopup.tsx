import ErrorForm from "./ErrorForm";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
interface AddApartmentPopoupProps {
    onClose: () => void;
    refresh: () => void;
}
type Errors = {
    name?: string;
    description?: string;
    tenant?: string;
};
const AddApartmentPopoup: React.FC<AddApartmentPopoupProps> = ({
    onClose,
    refresh,
}) => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext) as UserContextType;
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tenant: "",
    });
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            description: "",
            tenant: "",
        };
        if (!formData.name) {
            newErrors.name = "Podaj nazwe";
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = "Podaj opis mieszkania";
            isValid = false;
        }
        if (!formData.tenant) {
            newErrors.tenant = "Podaj lokatora";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const { name, description, tenant } = formData;
            const response = await fetch(`/api/apartment/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, tenant }),
            });
            if (response.ok) {
                // const data = await response.json();
                toast.success(t("apartment_added"));
                setTimeout(() => {
                    onClose();
                    refresh();
                }, 1000);
            } else {
                console.log("Error:", response.status, response.statusText);
                toast.error(t("apartment_not_added"));
            }
        }
    };

    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none"
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            {" "}
            <div className="w-11/12 lg:w-1/2 sm:h-2/3 bg-secondary-color rounded-lg flex flex-col justify-around items-center p-20 animate-slideInFromBottom border-2 border-text-color">
                <h1 className="text-2xl font-bold">{t("add_apartment")}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="fname">{t("apartment_name")}</label>
                            {errors.name && (
                                <ErrorForm text={t("give_name")}></ErrorForm>
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
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="description">
                                {t("apartment_description")}
                            </label>{" "}
                            {errors.description && (
                                <ErrorForm
                                    text={t("give_description")}
                                ></ErrorForm>
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
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="tenant">{t("tenant")}</label>{" "}
                            {errors.tenant && (
                                <ErrorForm text={t("give_tenant")}></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="tenant"
                            name="tenant"
                            className="p-2 rounded-lg"
                            value={formData.tenant}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    tenant: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        {" "}
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-primary-color p-2 rounded-lg border-2 cursor-pointer sm:w-20 border-black font-bold transform hover:scale-105"
                        />{" "}
                        <button
                            className="bg-red-700 p-2 border-2 border-black rounded-lg font-bold sm:w-20 transform hover:scale-105"
                            onClick={() => onClose()}
                        >
                            {t("cancel")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddApartmentPopoup;
