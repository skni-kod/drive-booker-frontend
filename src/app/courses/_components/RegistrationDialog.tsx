'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import CourseRegistrationForm from './CourseRegistrationForm';

interface RegistrationDialogProps {
  courseID: string;
  buttonClassName?: string;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon' | null;
}

export default function RegistrationDialog({
  courseID,
  buttonClassName,
  buttonSize = 'sm',
}: RegistrationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={buttonSize} className={buttonClassName}>
          ZAPISZ SIĘ
        </Button>
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
        <CourseRegistrationForm
          courseID={courseID}
          onSuccess={() => setIsOpen(false)}
          buttonSize={'lg'}
        />
      </DialogContent>
    </Dialog>
  );
}
