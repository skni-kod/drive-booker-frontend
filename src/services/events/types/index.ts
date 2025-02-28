export interface Event {
  id?: string;
  driverId?: string;
  title: string;
  start: Date;
  end: Date;
}

export interface Driver {
  id: string;
  name: string;
}
