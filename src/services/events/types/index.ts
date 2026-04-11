export interface Event {
  id?: number | string;
  driver_id?: string;
  instructor_id?: string;
  title?: string;
  start: Date;
  end: Date;
  status?: 'pending' | 'accepted' | 'rejected';
  location?: string | null;
}

export interface adminEvent {
  data: {
    id: string;
    title: string;
    start: string;
    end: string;
    driver: { id: string; name: string };
    instructor: { id: string; name: string };
    created_at: string;
    updated_at: string;
    status: 'pending' | 'accepted' | 'rejected';
  }[];
  links: {
    first: string;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
export interface Driver {
  id: string;
  name: string;
}
