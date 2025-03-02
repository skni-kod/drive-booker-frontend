import { AdminPanelApiRoutes } from '@/enums/routes';
import { axiosInstance } from '@/lib/axiosInstance';
import { Meta } from '../courses/types';
import { Driver } from './types';

export async function fetchDrivers(
  page: string | undefined,
  search: string = '',
) {
  let url: string = AdminPanelApiRoutes.Drivers;

  const params = new URLSearchParams();
  if (page) params.set('page', page);
  if (search) params.set('search', search);

  url += `?${params.toString()}`;

  const response = await axiosInstance.get<{ data: Driver[]; meta: Meta }>(url);

  return { data: response.data.data, meta: response.data.meta };
}
