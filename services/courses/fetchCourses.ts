import { axiosInstance } from '@/lib/axiosInstance';
import { Course, Meta } from './types';

export async function fetchCourses(
  page: string | undefined,
  sort: string | undefined,
  category: string | undefined,
  city: string | undefined,
  name: string | undefined,
): Promise<{ data: Course[]; meta: Meta }> {
  let url = '/api/courses';

  if (page) {
    url += `?page=${page}`;
  }
  if (sort) {
    url += url.includes('?') ? `&sort=${sort}` : `?sort=${sort}`;
  }
  if (category) {
    url += url.includes('?')
      ? `&filter[category.name]=${category}`
      : `?filter[category.name]=${category}`;
  }
  if (city) {
    url += url.includes('?')
      ? `&filter[school.city]=${city}`
      : `?filter[school.city]=${city}`;
  }
  if (name) {
    url += url.includes('?')
      ? `&filter[school.name]=${name}`
      : `?filter[school.name]=${name}`;
  }

  console.log(url);
  const response = await axiosInstance.get(url);
  return response.data;
}
