import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { useState } from 'react';
import ConfirmPopup from '../components/ConfirmPopup';

interface DataTabProps {
    id?: number;
    name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    voivodship?: string;
    city?: string;
    zip_code?: string;
    street?: string;
    house_number?: string;
}

const DataTab: React.FC<DataTabProps> = ({
    id,
    name: initialName = '',
    last_name: initialLastName = '',
    email: initialEmail = '',
    phone_number: initialPhoneNumber = '',
    voivodship: initialVoivodship = '',
    city: initialCity = '',
    zip_code: initialZipCode = '',
    street: initialStreet = '',
    house_number: initialHouseNumber = '',
}) => {
    const [formData, setFormData] = useState({
        name: initialName,
        last_name: initialLastName,
        email: initialEmail,
        phone_number: initialPhoneNumber,
        voivodship: initialVoivodship,
        city: initialCity,
        zip_code: initialZipCode,
        street: initialStreet,
        house_number: initialHouseNumber,
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
            console.log(data)
        } catch (err) {
            console.log("DUPA");
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
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Numer telefonu</Label>
                            <Input
                                id="phone_number"
                                type="text"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Województwo</Label>
                            <Input
                                id="voivodship"
                                type="text"
                                value={formData.voivodship}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Kod pocztowy</Label>
                            <Input
                                id="zip_code"
                                type="text"
                                value={formData.zip_code}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Numer domu</Label>
                            <Input
                                id="house_number"
                                type="text"
                                value={formData.house_number}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <Label className="text-xl">Nazwisko</Label>
                            <Input
                                id="last_name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">E-mail</Label>
                            <Input
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Miasto</Label>
                            <Input
                                id="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Label className="text-xl">Ulica</Label>
                            <Input
                                id="street"
                                type="text"
                                value={formData.street}
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
    );
};

export default DataTab;
