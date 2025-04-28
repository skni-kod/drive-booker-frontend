import { AdminPanelApiRoutes } from '@/enums/routes';
import { axiosInstance } from '@/lib/axiosInstance';
import { Meta } from '../courses/types';
import { CourseRequests } from './types';

export async function fetchCourseRequests(page: string | undefined) {
  let url: string = AdminPanelApiRoutes.Course_Registrations;

  const params = new URLSearchParams();
  if (page) params.set('page', page);

  url += `?${params.toString()}`;

  const response = await axiosInstance.get<{
    data: CourseRequests[];
    meta: Meta;
  }>(url);

  return { data: response.data.data, meta: response.data.meta };
}
