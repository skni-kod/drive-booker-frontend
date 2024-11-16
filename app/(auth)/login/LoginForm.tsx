'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='grid w-64 gap-4 md:w-96'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <div className='grid gap-1'>
        <Label>E-mail</Label>
        <Input name='email' type='email' placeholder='e-mail' required />
      </div>
      <div className='grid gap-1'>
        <Label>Password</Label>
        <Input
          name='password'
          placeholder='password'
          type='password'
          required
        />
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='remember' />
            <Label htmlFor='remember' className='text-sm'>
              Remember
            </Label>
          </div>
          <div className='flex items-center'>
            <Button asChild variant={'link'} className='pr-2'>
              <a href={'/forgot'}>Forgot password?</a>
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
  );
}
