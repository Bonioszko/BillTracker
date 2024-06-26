import ErrorForm from "./ErrorForm";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
interface PopupEmailProps {
    onClose: () => void;
    tenant: string;
}
type Errors = {
    subject?: string;
    body?: string;
    tenant?: string;
};
const PopupEmail: React.FC<PopupEmailProps> = ({ onClose, tenant }) => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext) as UserContextType;
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState({
        subject: "",
        body: "",
        tenant: tenant,
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateForm = () => {
            let isValid = true;
            const newErrors = {
                subject: "",
                body: "",
                tenant: "",
            };
            if (!formData.subject) {
                newErrors.subject = t("give_subject");
                isValid = false;
            }
            if (!formData.body) {
                newErrors.body = t("give_body");
                isValid = false;
            }
            if (!formData.tenant) {
                newErrors.tenant = t("give_email");
                isValid = false;
            }
            setErrors(newErrors);
            return isValid;
        };
        if (validateForm()) {
            const currentTime = new Date().getTime();
            const { subject, body, tenant } = formData;
            const lastEmailSent = localStorage.getItem(
                `lastEmailSent${tenant}`
            );
            if (
                lastEmailSent &&
                currentTime - Number(lastEmailSent) < 24 * 60 * 60 * 1000
            ) {
                toast.error(t("email_already_sent"));
                onClose();
                return;
            }
            const response = await fetch(`/api/email/${user?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject,
                    body,
                    email: tenant,
                }),
            });
            if (response.ok) {
                // const data = await response.json();
                localStorage.setItem(
                    `lastEmailSent${tenant}`,
                    String(currentTime)
                );
                toast.success(t("email_sent"));
                onClose();
            } else {
                console.log("Error:", response.status, response.statusText);
                toast.error(t("email_not_sent"));
            }
        }
    };
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center transition-none  "
            style={{ backgroundColor: "rgba(107, 114, 128, 0.45)" }}
        >
            <div className="w-11/12 lg:w-1/2 h-3/5 sm:h-1/2 bg-secondary-color rounded-lg flex flex-col justify-between items-center  p-10 border-2 border-text-color animate-slideInFromBottom">
                <h1 className="text-xl  font-bold">{t("send_email")}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="fname"> {t("subject")}</label>
                            {errors.subject && (
                                <ErrorForm text={errors.subject}></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="fsubject"
                            name="fsubject"
                            className="p-2 rounded-lg"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subject: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="ftenant">
                                {" "}
                                {t("email_tenant")}
                            </label>
                            {errors.tenant && (
                                <ErrorForm text={errors.tenant}></ErrorForm>
                            )}
                        </div>
                        <input
                            type="text"
                            id="ftenant"
                            name="ftenant"
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
                    <div className="flex flex-col">
                        {" "}
                        <div className="flex flex-col">
                            {" "}
                            <label htmlFor="fbody"> {t("body_email")}</label>
                            {errors.body && (
                                <ErrorForm text={errors.body}></ErrorForm>
                            )}
                        </div>
                        <textarea
                            id="fbody"
                            name="fbody"
                            className="p-2 rounded-lg"
                            value={formData.body}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    body: e.target.value,
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
export default PopupEmail;
