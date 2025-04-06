import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Clock } from 'lucide-react';
import { Slot } from './timeSlotUtils';
import { pl } from 'date-fns/locale';

type TimeSlotGroupProps = {
  group: {
    dayName: string;
    day: string;
    slots: Slot[];
  };
  toggleTimeSlot: (slot: Slot) => void;
};

export default function TimeSlotGroup({
  group,
  toggleTimeSlot,
}: TimeSlotGroupProps) {
  return (
    <div key={group.day} className='rounded-lg border p-4'>
      <h3 className='mb-3 font-medium'>
        {group.dayName}, {format(parseISO(group.day), 'd MMMM', { locale: pl })}
      </h3>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {group.slots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => toggleTimeSlot(slot)}
            className={`flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary ${
              slot.isPending ? 'border-amber-200 bg-amber-50' : ''
            }`}
          >
            <div className='flex items-center'>
              <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
              <span>
                {slot.startHour} - {slot.endHour}
              </span>
            </div>
            <Badge
              variant='outline'
              className={
                slot.isPending ? 'bg-amber-100 text-amber-800' : 'bg-background'
              }
            >
              {slot.isPending ? 'Zaznaczony' : 'Dostępny'}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
