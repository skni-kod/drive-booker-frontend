import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

export type Slot = {
  id: string;
  day: string;
  dayName: string;
  startHour: string;
  endHour: string;
  start_time: string;
  end_time: string;
  isPending: boolean;
};

export const formatTimeSlots = (
  slots: { start_time: string; end_time: string }[],
  driverPreferences: { start_time: string; end_time: string }[],
): Slot[] =>
  slots.map((slot) => {
    const startTime = parseISO(slot.start_time);
    const endTime = parseISO(slot.end_time);
    const day = format(startTime, 'yyyy-MM-dd');
    const dayName = format(startTime, 'EEEE', { locale: pl });
    const startHour = format(startTime, 'HH:mm');
    const endHour = format(endTime, 'HH:mm');

    const preference = driverPreferences.find(
      (p) => p.start_time === slot.start_time && p.end_time === slot.end_time,
    );

    return {
      id: slot.start_time,
      day,
      dayName,
      startHour,
      endHour,
      start_time: slot.start_time,
      end_time: slot.end_time,
      isPending: !!preference,
    };
  });

export const groupSlotsByDay = (slots: Slot[]) => {
  const grouped: Record<string, Slot[]> = {};
  slots.forEach((slot) => {
    if (!grouped[slot.day]) {
      grouped[slot.day] = [];
    }
    grouped[slot.day].push(slot);
  });

  return Object.entries(grouped).map(([day, slots]) => ({
    day,
    dayName: slots[0].dayName,
    slots,
  }));
};
