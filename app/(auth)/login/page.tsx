import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <LogInIcon />
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='my-4 text-sm text-muted-foreground'>
          Log in to take advantage of DriveBooker&apos;s capabilities
        </p>
        <form className='grid w-64 gap-4 md:w-96'>
          <div className='grid gap-1'>
            <Label>E-mail</Label>
            <Input
              id='email'
              placeholder='email'
              type='email'
              autoComplete='email'
            />
          </div>
          <div className='grid gap-1'>
            <Label>Password</Label>
            <Input id='password' placeholder='password' type='password' />
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='remember' />
                <Label htmlFor='remember' className='text-sm'>
                  Remember
                </Label>
              </div>
              <div className='flex items-center'>
                <Button asChild variant={'link'} className='pr-2'>
                  <Link href={'/forgot'}>Forgot password?</Link>
                </Button>
              </div>
            </div>
          </div>
          <Button
            className='w-full bg-black text-white hover:bg-gray-800'
            type='submit'
          >
            LOG IN
          </Button>
        </form>
      </main>
    </>
  );
}
