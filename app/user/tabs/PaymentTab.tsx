import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiRoutes } from "@/enums/routes.enums";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import ConfirmPopup from "../components/ConfirmPopup";


interface PaymenTabProps {
    id?: number;
    card_first_name?: string;
    card_last_name?: string;
    card_number?: number;
    card_expiry_date?: string;
    card_cvv?: number;
}

const PaymentTab: React.FC<PaymenTabProps> = (
    {
        id,
        card_first_name: initialCardFirstName = '',
        card_last_name: initialCardLastName = '',
        card_number: initialCardNumber = '',
        card_expiry_date: initialCardExpiryDate = '',
        card_cvv: initialCardCvv = ''
    }
) => {
    const [formData, setFormData] = useState({
        card_first_name: initialCardFirstName,
        card_last_name: initialCardLastName,
        card_number: initialCardNumber,
        card_expiry_date: initialCardExpiryDate,
        card_cvv: initialCardCvv
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.put(`${ApiRoutes.User}`, formData);
            const data = await response.data;
            setFormData(data);
            window.location.reload();
        } catch (err) {
            console.log("Failed to update user data!");
        }
    };

    const handleConfirm = () => {
        handleSubmit();
        setIsModalOpen(false);
        window.location.reload();
    };


    return (
        <>
            <form className="gap-4 space-y-12 mt-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-5">
                        <div>
                            <Label className="text-xl">Imię</Label>
                            <Input
                                id="card_first_name"
                                type="text"
                                value={formData.card_first_name}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Numer karty</Label>
                            <Input
                                id="card_number"
                                type="text"
                                value={formData.card_number}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">CVV</Label>
                            <Input
                                id="card_cvv"
                                type="text"
                                value={formData.card_cvv}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>

                    </div>
                    <div className="space-y-5">
                        <div>
                            <Label className="text-xl">Nazwisko</Label>
                            <Input
                                id="card_last_name"
                                type="text"
                                value={formData.card_last_name}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Data Ważności</Label>
                            <Input
                                id="card_expiry_date"
                                type="text"
                                value={formData.card_expiry_date}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                    </div>
                </div>
                <Button type="button" className="px-16 py-5 font-bold" onClick={() => setIsModalOpen(true)}>
                    ZATWIERDŹ ZMIANY
                </Button>
            </form>
            <ConfirmPopup isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={() => setIsModalOpen(false)} />
        </>
    )
}

export default PaymentTab;