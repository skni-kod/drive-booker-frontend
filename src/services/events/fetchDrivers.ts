import { axiosInstance } from '@/lib/axiosInstance';
import { Driver } from './types';

export async function fetchDrivers() {
  const response = await axiosInstance.get<{ data: Driver[] }>(
    `/api/instructor/drivers`,
  );
  return response.data.data;
}
