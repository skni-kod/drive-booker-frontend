'use client';

import { refreshSession } from '@/actions/refreshSession';
import { FormField } from '@/components/shared/FormField';
import { Button } from '@/components/ui/button';
import { sendProfileData } from '@/services/profile/sendProfileData';
import { FillProfileDataSchema } from '@/validators/fillProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormValues {
  phone_country: string;
  voivodship: string;
  city: string;
  zip_code: string;
  street: string;
  house_number: string;
}

export default function FillProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(FillProfileDataSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const success = await sendProfileData(data);
    setIsLoading(false);

    if (success) {
      await refreshSession();
      toast.success('Profile filled successfully!');
      redirect('/dashboard');
    } else {
      toast.error('Nie udało się uzupełnić profilu. Spróbuj ponownie później,');
    }
  };

  return (
    <div className='mt-8 flex min-h-screen flex-col items-center gap-4'>
      <h2 className='mb-8 text-center text-2xl font-bold'>
        Zanim zaczniesz korzystac z aplikacji uzupełnij dane!
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-4 space-y-1 sm:grid-cols-2'>
            <FormField
              id='voivodship'
              label='Województwo'
              register={register}
              error={errors.voivodship?.message}
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
            <FormField
              id='house_number'
              label='Numer domu'
              register={register}
              error={errors.house_number?.message}
            />
            <FormField
              id='zip_code'
              label='Kod pocztowy'
              register={register}
              error={errors.zip_code?.message}
              placeholder='__-___'
            />
            <Button
              type='submit'
              className='h-full w-full sm:col-span-2'
              disabled={isLoading}
            >
              {isLoading ? 'WYSYŁANIE...' : 'ZATWIERDŹ ZMIANY'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
