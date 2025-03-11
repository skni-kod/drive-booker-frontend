export interface Event {
  id?: string;
  driverId?: string;
  title: string;
  start: Date;
  end: Date;
  status?: 'pending' | 'accepted' | 'rejected';
}

export interface adminEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'accepted' | 'rejected';
}
export interface Driver {
  id: string;
  name: string;
}
