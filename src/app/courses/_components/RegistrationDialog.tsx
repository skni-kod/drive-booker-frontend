'use client';

import { FormField } from '@/components/shared/FormField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

interface FormValues {
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

export default function RegistrationDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>ZAPISZ SIĘ</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Zapisz się na kurs!</DialogTitle>
          <DialogDescription>
            Wypełnij formularz zgłoszeniowy znajdujący się obok. W ciągu 24
            godzin skontaktujemy się z Tobą, w celu potwierdzenia Twojego
            zgłoszenia się na kurs oraz poinformujemy o najbliższych zajęciach!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-3 flex flex-col items-stretch space-y-10'
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-5'>
              <FormField id='name' label='Imię' register={register}></FormField>
              <FormField
                id='email'
                label='Adres e-mail'
                register={register}
              ></FormField>
            </div>
            <div className='space-y-5'>
              <FormField
                id='last_name'
                label='Nazwisko'
                register={register}
              ></FormField>
              <FormField
                id='phone'
                label='Numer telefonu'
                register={register}
              ></FormField>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='col-span-2 flex flex-row gap-2'>
              <Checkbox id='agreement' />
              <Label htmlFor='agreement' className='text-xs'>
                Wyrażam zgodę na przetwarzenie moich danych przez Ośrodek
                Szkolenia Kierowców “Nazwa szkoły” w następujących celach:
                nawiązania kontaktu podczas realizacji kursu / szkolenia /
                kwalifikacji; zapisu na egzamin państwowy do wybranego
                Wojewódzkiego Ośrodka Ruchu Drogowego; zapisu na jazdy w
                warunkach specjalnych; wyrobieniu Profilu Kandydata na Kierowcą
                w wybranym Wydziale Komunikacji; zapisu na jazdy próbne przed
                egzaminem państwowym w wybranym Wojewódzkim Ośrodku Ruchu
                Drogowego; zgłoszenia do ubezpieczenia wynikającego ze
                skierowania na szkolenie oraz innych wynikających z prawidłowego
                wykonania usługi. Dane osobowe podaję dobrowolnie i oświadczam,
                że są one zgodne z prawdą. Zapoznałem/am się z treścią klauzuli
                informacyjnej, w tym z informacją o celu i sposobach
                przetwarzania danych osobowych oraz prawie dostępu do treści
                swoich danych i prawie ich poprawiania.
              </Label>
            </div>
          </div>
          <DialogFooter className='gap-y-3 sm:justify-start'>
            <Button type='submit' size='sm'>
              ZAPISUJĘ SIĘ!
            </Button>
            <DialogClose asChild>
              <Button size='sm'>ANULUJ</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
