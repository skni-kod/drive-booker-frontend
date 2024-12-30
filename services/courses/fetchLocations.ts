import { axiosInstance } from '@/lib/axiosInstance';

export async function fetchLocations() {
  const response = await axiosInstance.get<string[]>(`/api/course-locations`);
  return response.data;
}
