import { axiosInstance } from '@/lib/axiosInstance';

export interface TimeSlot {
  start_time: string; // ISO 8601 date-time string
  end_time: string; // ISO 8601 date-time string
}
interface WeeklyScheduleResponse {
  data: {
    currentWeek: TimeSlot[];
    nextWeek: TimeSlot[];
  };
}

export async function fetchAvailability() {
  const response = await axiosInstance.get<WeeklyScheduleResponse>(
    `/api/instructor/availability`,
  );
  return response.data.data;
}

export async function fetchAvailabilityForDriver() {
  const response = await axiosInstance.get<WeeklyScheduleResponse>(
    `/api/driver/events/available`,
  );
  return response.data.data;
}
