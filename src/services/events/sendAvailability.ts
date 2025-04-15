import { axiosInstance } from '@/lib/axiosInstance';

interface AvailabilityResponse {
  data: {
    message: string;
    saved: SavedAvailability[];
  };
}

interface SavedAvailability {
  instructor_id: number;
  start_time: string; // ISO 8601 date-time string
  end_time: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
  created_at: string; // ISO 8601 date-time string
  id: number;
}

interface InstructorAvailability {
  availability: TimeSlot[];
}

interface TimeSlot {
  start_time: string; // ISO 8601 date-time string
  end_time: string; // ISO 8601 date-time string
}

export async function sendAvailability(
  instructorAvailability: InstructorAvailability,
) {
  try {
    return axiosInstance.post<AvailabilityResponse>(
      '/api/instructor/availability',
      {
        availability: instructorAvailability.availability,
      },
    );
  } catch (error) {
    console.error('Failed to create event:', error);
    throw new Error('Could not create event');
  }
}
