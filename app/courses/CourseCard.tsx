import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  name: string;
  id: string;
  category: string;
  address: string;
  date: string;
  price: string;
}

export default function CourseCard({
  name,
  id,
  category,
  address,
  date,
  price,
}: CourseCardProps) {
  return (
    <Card className='w-full max-w-4xl'>
      <CardContent className='p-4'>
        {/* mobile screen size */}
        <div className='flex flex-col sm:hidden'>
          <div className='mb-2 flex items-start justify-between'>
            <div className='h-8 w-8 rounded-sm bg-muted' />
            <span className='rounded bg-black px-2 py-1 text-xs text-white'>
              {category}
            </span>
          </div>
          <h3 className='mb-2 text-lg font-semibold'>{name}</h3>
          <div className='flex justify-between text-lg'>
            <div className='flex flex-row'>
              <Calendar className='mr-1 h-4 w-4 text-green-600' />
              <span className='text-green-600'>{date}</span>
            </div>
            <div>
              <div className='flex flex-row'>
                <Tag className='mr-1 h-4 w-4 text-green-600' />
                <span className='text-green-600'>{price}</span>
              </div>
            </div>
          </div>
        </div>
        {/* sm and larger screens */}
        <div className='hidden items-center gap-4 sm:flex'>
          <div className='h-16 w-16 shrink-0 rounded-sm bg-muted' />

          <div className='flex-1'>
            <h3 className='font-medium'>{name}</h3>
            <p className='text-sm text-muted-foreground'>{category}</p>
            <p className='truncate text-sm text-muted-foreground'>{address}</p>
          </div>

          <div className='ml-auto flex shrink-0 flex-col items-end gap-2'>
            <div className='text-right'>
              <div className='text-sm text-muted-foreground'>
                UPCOMING <span className='text-green-600'>{date}</span>
              </div>
              <div className='text-sm font-medium'>
                FROM <span className='text-green-600'>{price}</span>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm' asChild>
                <Link href={`/courses/${id}`}>DETAILS</Link>
              </Button>
              <Button size='sm'>SIGN UP</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
