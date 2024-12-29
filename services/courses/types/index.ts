export interface Course {
  id: string;
  school: { name: string; address: string };
  category: { name: string };
  start_date: string;
  price: string;
}

export interface Meta {
  current_page: number;
  total: number;
  per_page: number;
}
