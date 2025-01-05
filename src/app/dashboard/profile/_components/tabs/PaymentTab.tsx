import { ConfirmPopup } from '@/components/shared/ConfirmPopup';
import { FormField } from '@/components/shared/FormField';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axiosInstance';
import { ProfilePaymentSchema } from '@/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormValues {
  card_first_name?: string;
  card_last_name?: string;
  card_number?: string;
  card_expiry_date?: string;
  card_cvv?: string;
}

interface PaymentTabProps extends FormValues {
  userID?: string;
  onUpdate?: () => void;
}

const PaymentTab: React.FC<PaymentTabProps> = ({
  userID,
  onUpdate,
  ...initialValues
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ProfilePaymentSchema),
    defaultValues: initialValues,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const openModal = (data: FormValues) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!formData || !userID) return;

    try {
      await axiosInstance.put(`/api/user/${userID}/credit-card`, formData);
      setIsModalOpen(false);
      onUpdate?.();
      toast.success('Dane zostały zaktualizowane!');
    } catch (err) {
      console.log(err);
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
              id='card_first_name'
              label='Imię'
              register={register}
              error={errors.card_first_name?.message}
            />
            <FormField
              id='card_number'
              label='Numer karty'
              register={register}
              error={errors.card_number?.message}
            />
            <FormField
              id='card_cvv'
              label='CVV'
              register={register}
              error={errors.card_cvv?.message}
            />
          </div>
          <div className='space-y-5'>
            <FormField
              id='card_last_name'
              label='Nazwisko'
              register={register}
              error={errors.card_last_name?.message}
            />
            <FormField
              id='card_expiry_date'
              label='Data Ważności'
              register={register}
              error={errors.card_expiry_date?.message}
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

export default PaymentTab;
