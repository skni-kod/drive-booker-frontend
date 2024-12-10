import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axiosInstance from '@/lib/axiosInstance';
import CourseCard from './CourseCard';

export default async function CoursePage() {
  try {
    const response = await axiosInstance.get('/api/courses');
    const { data } = response.data;
    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>Driving courses in your area</h1>
        <div className='flex max-w-4xl flex-col gap-2 md:w-2/3'>
          <div className='flex w-full flex-col justify-between py-4 sm:flex-row'>
            <div className='flex flex-row gap-2 py-2'>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Sort' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>some method</SelectItem>
                  <SelectItem value='2'>some method</SelectItem>
                  <SelectItem value='3'>some method</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Location' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>some location</SelectItem>
                  <SelectItem value='2'>some location</SelectItem>
                  <SelectItem value='3'>some location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-row gap-4'>
              <Input />
              <Button>Search</Button>
            </div>
          </div>
          {data.map(
            (course: {
              id: string;
              school: { name: string; address: string };
              category: { name: string };
              start_date: string;
              price: string;
            }) => {
              return (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  name={course.school.name}
                  category={course.category.name}
                  address={course.school.address}
                  date={course.start_date}
                  price={course.price}
                />
              );
            },
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    return (
      <main>
        <p>Something went wrong</p>
      </main>
    );
  }
}
