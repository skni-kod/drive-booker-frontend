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
  sort: string | undefined,
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
