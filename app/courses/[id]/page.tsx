import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SingleCourseCard from './SingleCourseCard';

export default async function CourseDetailsPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <div className='my-16 flex w-4/5 flex-col'>
        <div className='flex flex-col justify-between sm:flex-row'>
          <div className='flex flex-col'>
            <h1 className='text-3xl font-bold'>School name</h1>
            <h2 className='text-lg'>school adress</h2>
            <h1 className='text-xl font-semibold'>description</h1>
            <h2>example description</h2>
          </div>
          <SingleCourseCard date='18.11.2023' category='B' price='2500' />
        </div>
      </div>
      <div className='grid w-full place-content-center gap-3 bg-slate-200 p-16'>
        <h1 className='text-center text-3xl font-semibold'>
          Sign up into course!
        </h1>
        <h2 className='text-md text-center'>
          Fill out the application form below. We will contact you within 24
          hours to confirm your course registration and let you know about
          upcoming classes!
        </h2>
        <div className='flex flex-row gap-2'>
          <Input placeholder='name' />
          <Input placeholder='surname' />
        </div>
        <div className='flex flex-row gap-2'>
          <Input placeholder='e-mail' />
          <Input placeholder='telephone number' />
        </div>
        <div className='flex flex-row gap-2'>
          <Checkbox id='agreement' />
          <Label htmlFor='agreement' className='text-xs'>
            I agree to the processing of my data by the Center for Driver
            Training “The name of the school” and I provide personal data
            voluntarily and declare that they are true. I have read the contents
            of the information clause, including information about the purpose
            and means of processing personal data and the right of access to the
            content of my data and the right to correct them.
          </Label>
        </div>
        <Button className='w-full sm:w-2/5'>SIGN</Button>
      </div>
    </main>
  );
}
