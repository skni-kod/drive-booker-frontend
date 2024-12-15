import axiosInstance from '@/lib/axiosInstance';

export interface Course {
  id: string;
  school: { name: string; address: string };
  category: { name: string };
  start_date: string;
  price: string;
}

interface Meta {
  current_page: number;
  total: number;
  per_page: number;
}

export async function fetchCourses(
  page: string | undefined,
): Promise<{ data: Course[]; meta: Meta }> {
  const response = await axiosInstance.get(`/api/courses?page=${page}`);
  return response.data;
}
