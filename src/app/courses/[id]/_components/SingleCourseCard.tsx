import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import RegistrationDialog from '../../_components/RegistrationDialog';

interface SingleCourseCardProps {
  id: string;
  date: string;
  category: string;
  price: string;
}

export default function SingleCourseCard({
  id,
  date,
  category,
  price,
}: SingleCourseCardProps) {
  return (
    <Card className='h-fit w-full max-w-sm md:w-1/2'>
      <CardHeader className='p-0'>
        <div className='h-48 w-full bg-muted' />
      </CardHeader>
      <CardContent className='space-y-3 p-6'>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-blue-700'>START:</span>
          <span>{date}</span>
        </div>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-blue-700'>KATEGORIA:</span>
          <span>{category}</span>
        </div>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-blue-700'>CENA:</span>
          <span className='text-green-700'>{price} ZŁ</span>
        </div>
      </CardContent>
      <CardFooter>
        <RegistrationDialog
          courseID={id}
          buttonClassName='w-full bg-black hover:bg-black/90'
          buttonSize='lg'
        />
      </CardFooter>
    </Card>
  );
}
