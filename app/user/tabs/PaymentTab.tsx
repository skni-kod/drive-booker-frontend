import { Button } from "@/components/ui/button";
import { ApiRoutes } from "@/enums/routes.enums";
import axiosInstance from "@/lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ConfirmPopup from "../components/ConfirmPopup";
import FormField from "../components/FormField";
import { UserPaymentSchema } from "../validation_schema";

interface PaymentTabProps {
    card_first_name?: string;
    card_last_name?: string;
    card_number?: string;
    card_expiry_date?: string;
    card_cvv?: string;
}

const PaymentTab: React.FC<PaymentTabProps> = ({
    ...initialValues
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(UserPaymentSchema),
        defaultValues: initialValues
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<PaymentTabProps | null>(null);

    const openModal = (data: PaymentTabProps) => {
        setFormData(data);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!formData) return;

        try {
            await axiosInstance.put(`${ApiRoutes.User}`, formData);
            setIsModalOpen(false);
            window.location.reload();
            toast.success("Dane zostały zaktualizowane!");
        } catch (err) {
            toast.error("Wystąpił błąd podczas aktualizacji danych.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit((data) => openModal(data))} className="gap-4 space-y-12 mt-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-5">
                        <FormField
                            id="card_first_name"
                            label="Imię"
                            register={register}
                            error={errors.card_first_name?.message}
                        />
                        <FormField
                            id="card_number"
                            label="Numer karty"
                            register={register}
                            error={errors.card_number?.message}
                        />
                        <FormField
                            id="card_cvv"
                            label="CVV"
                            register={register}
                            error={errors.card_cvv?.message}
                        />
                    </div>
                    <div className="space-y-5">
                        <FormField
                            id="card_last_name"
                            label="Nazwisko"
                            register={register}
                            error={errors.card_last_name?.message}
                        />
                        <FormField
                            id="card_expiry_date"
                            label="Data Ważności"
                            register={register}
                            error={errors.card_expiry_date?.message}
                        />
                    </div>
                </div>
                <Button type="submit" className="px-16 py-5 font-bold">
                    ZATWIERDŹ ZMIANY
                </Button>
            </form>
            <ConfirmPopup
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default PaymentTab;
