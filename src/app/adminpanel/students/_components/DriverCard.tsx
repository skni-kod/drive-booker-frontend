import BaseCard from '@/components/shared/BaseCard/BaseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DriverCardProps {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  registrationDate?: string;
  icon?: string;
  hrefDetails?: string;
}

export default function DriverCard({
  id,
  name,
  email,
  phone,
  registrationDate,
  icon,
  hrefDetails,
}: DriverCardProps) {
  return (
    <BaseCard
      title={name}
      subtitle={email}
      icon={icon}
      contentLeft={
        <>{phone && <p className='text-sm text-muted-foreground'>{phone}</p>}</>
      }
      extraInfoTopRight={
        registrationDate && (
          <div className='text-sm text-muted-foreground'>
            Data rejestracji:{' '}
            <span className='text-green-600'>{registrationDate}</span>
          </div>
        )
      }
      actions={
        hrefDetails && (
          <Button variant='outline' size='sm' asChild>
            <Link href={hrefDetails}>Szczegóły</Link>
          </Button>
        )
      }
    />
  );
}
