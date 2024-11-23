import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface SingleCourseCardProps {
  date: string;
  category: string;
  price: string;
}

export default function SingleCourseCard({
  date,
  category,
  price,
}: SingleCourseCardProps) {
  return (
    <Card className='w-full max-w-sm sm:w-1/2'>
      <CardHeader className='p-0'>
        <div className='h-48 w-full bg-muted' />
      </CardHeader>
      <CardContent className='space-y-3 p-6'>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-primary'>START:</span>
          <span className='text-blue-700'>{date}</span>
        </div>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-primary'>CATEGORY:</span>
          <span className='text-blue-700'>{category}</span>
        </div>
        <div className='flex items-center justify-end gap-x-2 text-sm'>
          <span className='font-medium text-primary'>PRICE:</span>
          <span className='text-green-700'>{price} ZŁ</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full bg-black hover:bg-black/90' size='lg'>
          SIGN IN
        </Button>
      </CardFooter>
    </Card>
  );
}
