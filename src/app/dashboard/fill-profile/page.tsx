'use client';

import { FormField } from '@/components/shared/FormField';
import { ProfileDataSchema } from '@/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

interface FormValues {
  name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  phone_country?: string;
  voivodship?: string;
  city?: string;
  zip_code?: string;
  street?: string;
  house_number?: string;
}

export default function FillProfilePage() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(ProfileDataSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <div className='flex min-h-screen flex-col items-center gap-4'>
      To use app you need to fill your profile data
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            id='name'
            label='placeholder'
            register={register}
            error={errors.name?.message}
          />
          <FormField
            id='last_name'
            label='placeholder'
            register={register}
            error={errors.last_name?.message}
          />
        </form>
      </FormProvider>
    </div>
  );
}
