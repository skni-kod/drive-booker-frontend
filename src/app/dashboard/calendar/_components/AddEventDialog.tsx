'use client';

import { Button } from '@/components/ui/button';
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
import { useState } from 'react';

export default function AddEventDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, startDate, endDate });
    setOpen(false);
    // Reset form fields
    setTitle('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Dodaj wydarzenie</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Dodaj nowe wydarzenie</DialogTitle>
          <DialogDescription>
            Wprowadź szczegóły wydarzenia. Zapisz zmiany gdy skończysz.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='title' className='text-right'>
                Tytuł
              </Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='start-date' className='text-right'>
                Data rozpoczęcia
              </Label>
              <Input
                id='start-date'
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='end-date' className='text-right'>
                Data zakończenia
              </Label>
              <Input
                id='end-date'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Zamknij
              </Button>
            </DialogClose>
            <Button type='submit'>Zapisz wydarzenia</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
