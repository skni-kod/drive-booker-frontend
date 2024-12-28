import { Button } from '@/components/ui/button';
import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmPopup from '../components/ConfirmPopup';
import FormField from '../components/FormField';
import { UserDataSchema } from '../validation_schema';

interface FormValues {
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

interface DataTabProps extends FormValues {
  userID?: string;
  onUpdate?: () => void;
}

const DataTab: React.FC<DataTabProps> = ({
  userID,
  onUpdate,
  ...initialValues
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: initialValues,
  });
  const openModal = (data: FormValues) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!formData || !userID) return;

    try {
      await axiosInstance.put(`${ApiRoutes.User(userID)}`, formData);
      setIsModalOpen(false);
      onUpdate?.();
      toast.success('Dane zostały zaktualizowane!');
    } catch (err) {
      toast.error('Wystąpił błąd podczas aktualizacji danych.');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => openModal(data))}
        className='mt-5 flex flex-col gap-4 space-y-12'
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-5'>
            <FormField
              id='name'
              label='Imię'
              register={register}
              error={errors.name?.message}
            />
            <FormField
              id='phone_number'
              label='Numer telefonu'
              register={register}
              error={errors.phone_number?.message}
            />
            <FormField
              id='voivodship'
              label='Województwo'
              register={register}
              error={errors.voivodship?.message}
            />
            <FormField
              id='zip_code'
              label='Kod pocztowy'
              register={register}
              error={errors.zip_code?.message}
            />
            <FormField
              id='house_number'
              label='Numer domu'
              register={register}
              error={errors.house_number?.message}
            />
          </div>
          <div className='space-y-5'>
            <FormField
              id='last_name'
              label='Nazwisko'
              register={register}
              error={errors.last_name?.message}
            />
            <FormField
              id='email'
              label='Email'
              register={register}
              error={errors.email?.message}
              disabled
            />
            <FormField
              id='city'
              label='Miasto'
              register={register}
              error={errors.city?.message}
            />
            <FormField
              id='street'
              label='Ulica'
              register={register}
              error={errors.street?.message}
            />
          </div>
        </div>
        <Button
          type='submit'
          className='self-center px-16 py-5 font-bold sm:self-start'
        >
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

export default DataTab;
