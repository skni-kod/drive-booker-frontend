'use client';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/dateTimePicker';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getQueryClient } from '@/lib/getQueryClient';
import { sendEvent } from '@/services/events/sendEvent';
import { Driver, Event } from '@/services/events/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AddEventDialog({ drivers }: { drivers: Driver[] }) {
  const [open, setOpen] = useState(false);
  const queryClient = getQueryClient();
  const methods = useForm({
    defaultValues: {
      title: '',
      driverId: '',
      start: new Date(),
      end: new Date(),
    },
  });

  const { mutate } = useMutation<void, Error, Event>({
    mutationFn: sendEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Wydarzenie zostało dodane');
      setOpen(false);
      methods.reset();
    },
    onError: (error: Error) => {
      console.error('Error creating event:', error);
      toast.error('wystąpił błąd');
    },
  });

  const onSubmit = (data: Event) => {
    const { title, driverId, start, end } = data;
    if (!title || !driverId || !start || !end) {
      toast.info('Please fill in all fields');
      return;
    }
    mutate({
      title,
      driverId,
      start: start,
      end: end,
    });
  };

  const selectedDriver = methods.watch('driverId');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='mt-4'>
          Dodaj wydarzenie
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Dodaj nowe wydarzenie</DialogTitle>
          <DialogDescription>
            Wprowadź szczegóły wydarzenia. Zapisz zmiany gdy skończysz.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='title' className='text-right'>
                  Tytuł
                </Label>
                <Input
                  id='title'
                  {...methods.register('title')}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='driver' className='text-right'>
                  Kursant
                </Label>
                <div className='col-span-3'>
                  <Select
                    value={selectedDriver}
                    onValueChange={(value: string) =>
                      methods.setValue('driverId', value)
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Wybierz kursanta' />
                    </SelectTrigger>
                    <SelectContent className='fixed left-0 top-2 z-[9999] border-none shadow-none'>
                      {drivers.length > 0 ? (
                        drivers.map((driver) => (
                          <SelectItem
                            key={driver.id}
                            value={driver.id.toString()}
                          >
                            {driver.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value={'clear'}>
                          Brak kursantów
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='start-date' className='text-right'>
                  Data rozpoczęcia
                </Label>
                <div className='col-span-3'>
                  <DateTimePicker
                    value={methods.watch('start')}
                    onChange={(date) => methods.setValue('start', date)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='end-date' className='text-right'>
                  Data zakończenia
                </Label>
                <div className='col-span-3'>
                  <DateTimePicker
                    value={methods.watch('end') ?? null}
                    onChange={(date) => methods.setValue('end', date)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Anuluj
                </Button>
              </DialogClose>
              <Button type='submit'>Zapisz wydarzenia</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
