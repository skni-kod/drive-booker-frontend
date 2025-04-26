import { Driver } from '@/services/adminpanel/types';
import DriverCard from './DriverCard';

export function DriversList({ drivers }: { drivers: Driver[] }) {
  if (!drivers.length) {
    return (
      <p className='text-center text-gray-500'>Lista kursantów jest pusta.</p>
    );
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      {drivers.map((driver) => (
        <DriverCard
          key={driver.id}
          id={driver.id}
          name={driver.name}
          email={driver.email}
          phone={driver.phone_number}
          registrationDate={driver.created_at}
          hrefDetails={`/admin/kursanci/${driver.id}`}
        />
      ))}
    </div>
  );
}
