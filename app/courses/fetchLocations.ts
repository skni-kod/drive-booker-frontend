import axiosInstance from '@/lib/axiosInstance';

export async function fetchLocations(): Promise<string[]> {
  const response = await axiosInstance.get(`/api/courses-locations`);
  return response.data;
}
