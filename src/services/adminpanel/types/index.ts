export interface Driver {
  id: number;
  name: string;
  last_name: string;
  email: string;
  roles: string[];
  phone_number: string;
  voivodship: string;
  city: string;
  zip_code: string;
  street: string;
  house_number: string;
}

export interface CourseRequests {
  id: number;
  course_id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}
