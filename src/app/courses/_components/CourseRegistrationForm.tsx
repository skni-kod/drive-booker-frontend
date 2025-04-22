'use client';

import { FormField } from '@/components/shared/FormField';
import { PhoneInput } from '@/components/shared/PhoneInput/PhoneInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { axiosInstance } from '@/lib/axiosInstance';
import { CourseRegistrationSchema } from '@/validators/courseRegistration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CourseRegistrationFormProps {
  courseID: string;
  onSuccess?: () => void;
  buttonClassName?: string;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon' | null;
}

interface FormValues {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  phone_country: string;
}

export default function CourseRegistrationForm({
  courseID,
  onSuccess,
  buttonClassName,
  buttonSize = 'sm',
}: CourseRegistrationFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(CourseRegistrationSchema),
    defaultValues: {
      phone_country: 'pl',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [isChecked, setIsChecked] = useState(false);

  const handleFormSubmit = async (data: FormValues) => {
    if (!isChecked) {
      toast.error('Musisz wyrazić zgodę na przetwarzanie danych.');
      return;
    }

    try {
      console.log(data);

      await axiosInstance.post(`/api/courses/${courseID}/registrations`, data);

      toast.success('Wysłano zgłoszenie na kurs!');
      reset();
      setIsChecked(false);
      onSuccess?.();
    } catch (error) {
      console.error('Błąd podczas wysyłania zgłoszenia:', error);
      toast.error('Wystąpił błąd podczas wysyłania zgłoszenia.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='mt-3 flex flex-col items-stretch space-y-6'
      >
        <div className='mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            id='name'
            label='Imię'
            register={register}
            error={errors.name?.message}
          />
          <FormField
            id='last_name'
            label='Nazwisko'
            register={register}
            error={errors.last_name?.message}
          />
          <FormField
            id='email'
            label='Adres e-mail'
            register={register}
            error={errors.email?.message}
          />
          <PhoneInput
            id='phone'
            label='Numer telefonu'
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className='flex items-start gap-2'>
          <Checkbox
            id='agreement'
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(!!checked)}
          />
          <Label htmlFor='agreement' className='text-xs'>
            Wyrażam zgodę na przetwarzenie moich danych przez Ośrodek Szkolenia
            Kierowców &quot;Nazwa szkoły&quot; w następujących celach:
            nawiązania kontaktu podczas realizacji kursu / szkolenia /
            kwalifikacji; zapisu na egzamin państwowy do wybranego Wojewódzkiego
            Ośrodka Ruchu Drogowego; zapisu na jazdy w warunkach specjalnych;
            wyrobieniu Profilu Kandydata na Kierowcą w wybranym Wydziale
            Komunikacji; zapisu na jazdy próbne przed egzaminem państwowym w
            wybranym Wojewódzkim Ośrodku Ruchu Drogowego; zgłoszenia do
            ubezpieczenia wynikającego ze skierowania na szkolenie oraz innych
            wynikających z prawidłowego wykonania usługi. Dane osobowe podaję
            dobrowolnie i oświadczam, że są one zgodne z prawdą. Zapoznałem/am
            się z treścią klauzuli informacyjnej, w tym z informacją o celu i
            sposobach przetwarzania danych osobowych oraz prawie dostępu do
            treści swoich danych i prawie ich poprawiania.
          </Label>
        </div>
        <div className='flex flex-row justify-center gap-2 md:justify-start'>
          <Button type='submit' size={buttonSize} className={buttonClassName}>
            ZAPISUJĘ SIĘ!
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
