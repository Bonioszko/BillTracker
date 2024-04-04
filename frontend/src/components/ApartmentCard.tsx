import { useTranslation } from "react-i18next";
interface ApartmentCardProps {
    name: string;
    description: string;
    tenant: string;
}
const ApartmentCard: React.FC<ApartmentCardProps> = ({
    name,
    description,
    tenant,
}) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center gap-3 h-40 rounded-xl bg-secondary-color  p-2 sm:p-5">
            {" "}
            <div className="font-bold text-lg text-wrap text-center text-text-color">
                {name}
            </div>
            <div>{description}</div>
            <div>
                {" "}
                {t("tenant")} : {tenant}
            </div>
        </div>
    );
};
export default ApartmentCard;
