import BaseCard from '@/components/shared/BaseCard/BaseCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CourseCardProps {
  id: string;
  name: string;
  category?: string;
  startDate?: string;
  price?: string;
  icon?: string;
  address?: string;
  hrefDetails?: string;
  actions?: ReactNode;
}

export default function CourseCard({
  id,
  name,
  category,
  startDate,
  price,
  icon,
  address,
  hrefDetails,
  actions,
}: CourseCardProps) {
  return (
    <BaseCard
      title={name}
      category={category}
      icon={icon}
      subtitle={address}
      extraInfoTopRight={
        <div className='text-right text-sm'>
          {startDate && (
            <div className='text-muted-foreground'>
              Start: <span className='text-green-600'>{startDate}</span>
            </div>
          )}
          {price && (
            <div className='font-medium'>
              Cena: <span className='text-green-600'>{price}</span>
            </div>
          )}
        </div>
      }
      actions={
        <>
          {hrefDetails && (
            <Button variant='outline' size='sm' asChild>
              <Link href={hrefDetails}>Szczegóły</Link>
            </Button>
          )}
          {actions}
        </>
      }
    />
  );
}
