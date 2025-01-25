'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

type DateTimePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initialTime = `${value.getHours().toString().padStart(2, '0')}:${value
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  const [time, setTime] = useState<string>(initialTime);
  const [date, setDate] = useState<Date>(value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full font-normal', !date && 'text-muted-foreground')}
        >
          {date ? `${format(date, 'PPP')}, ${time}` : <span>Pick a date</span>}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex w-auto items-start p-0' align='start'>
        <Calendar
          mode='single'
          captionLayout='dropdown'
          selected={date ?? undefined}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;
            const [hours, minutes] = time.split(':');
            selectedDate?.setHours(parseInt(hours), parseInt(minutes));
            setDate(selectedDate);
            onChange(selectedDate);
          }}
          fromYear={2000}
          toYear={new Date().getFullYear()}
          disabled={(date) =>
            Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
            Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
          }
        />
        <Select
          defaultValue={time}
          open={isOpen}
          onValueChange={(e) => {
            setTime(e);
            if (date) {
              const [hours, minutes] = e.split(':');
              const newDate = new Date(date.getTime());
              newDate.setHours(parseInt(hours), parseInt(minutes));
              setDate(newDate);
              onChange(newDate);
            }
          }}
        >
          <SelectTrigger className='my-4 mr-2 w-[120px] font-normal focus:ring-0'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='fixed left-0 top-2 mr-2 border-none shadow-none'>
            <ScrollArea className='h-[15rem]'>
              {Array.from({ length: 96 }).map((_, i) => {
                const hour = Math.floor(i / 4)
                  .toString()
                  .padStart(2, '0');
                const minute = ((i % 4) * 15).toString().padStart(2, '0');
                return (
                  <SelectItem key={i} value={`${hour}:${minute}`}>
                    {hour}:{minute}
                  </SelectItem>
                );
              })}
            </ScrollArea>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
