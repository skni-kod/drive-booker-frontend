export interface Event {
  id?: string;
  driverId?: string;
  title: string;
  start: Date;
  end: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Driver {
  id: string;
  name: string;
}
