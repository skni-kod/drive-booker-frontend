import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CourseCard from './CourseCard';

export default async function CoursePage() {
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
        <CourseCard
          title='Rondo Nauka Jazdy'
          category='Kat. B'
          address='Mikołaja Kopernika 1, 37-100 Łańcut'
          date='18.11.2023'
          price='2500 ZŁ'
        />
        <CourseCard
          title='Rondo Nauka Jazdy'
          category='Kat. B'
          address='Mikołaja Kopernika 1, 37-100 Łańcut'
          date='18.11.2023'
          price='2500 ZŁ'
        />
        <CourseCard
          title='Rondo Nauka Jazdy'
          category='Kat. B'
          address='Mikołaja Kopernika 1, 37-100 Łańcut'
          date='18.11.2023'
          price='2500 ZŁ'
        />
      </div>
    </main>
  );
}
