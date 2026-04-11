'use client';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/dateTimePicker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getQueryClient } from '@/lib/getQueryClient';
import { deleteEvent } from '@/services/events/deleteEvent';
import { Event } from '@/services/events/types';
import { updateEvent } from '@/services/events/updateEvent';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface SelectEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
}

export const SelectEventDialog: React.FC<SelectEventDialogProps> = ({
  open,
  onOpenChange,
  event,
}) => {
  const queryClient = getQueryClient();
  const methods = useForm({
    defaultValues: {
      title: event.title,
      start: event.start,
      end: event.end,
    },
  });

  useEffect(() => {
    if (event) {
      methods.reset({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      });
    }
  }, [event, methods]);

  const { mutate: mutateDeleteEvent } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['driverWeeklySchedule'] });
      toast.success('Wydarzenie zostało usunięte');
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error('Error deleting event:', error);
      toast.error('Wystąpił błąd podczas usuwania wydarzenia');
    },
  });

  const { mutate } = useMutation<void, Error, Event>({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['driverWeeklySchedule'] });
      toast.success('Wydarzenie zostało zaktualizowane');
      onOpenChange(false);
      methods.reset();
    },
    onError: (error: Error) => {
      console.error('Error updating event:', error);
      toast.error('wystąpił błąd');
    },
  });

  const onSubmit = (data: Event) => {
    const { title, start, end } = data;
    if (!title || !start || !end) {
      toast.info('Please fill in all fields');
      return;
    }
    console.log(start);
    console.log(end);
    mutate({
      id: event.id,
      title,
      start: start,
      end: end,
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            Edytuj lub usuń wydarzenie. Zapisz zmiany gdy skończysz.
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
                <Label htmlFor='start-date' className='text-right'>
                  Data rozpoczęcia
                </Label>
                <div className='col-span-3'>
                  <DateTimePicker
                    value={new Date(methods.watch('start'))}
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
                    value={methods.watch('end')}
                    onChange={(date) => methods.setValue('end', date)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='destructive'
                onClick={() => {
                  mutateDeleteEvent(event);
                }}
              >
                Usuń wydarzenie
              </Button>
              <Button type='submit'>Zapisz wydarzenia</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
