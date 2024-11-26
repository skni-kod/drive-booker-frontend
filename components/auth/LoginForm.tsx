'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

type TLoginForm = {
  email: string;
  password: string;
};
const schema: ZodType<TLoginForm> = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({ resolver: zodResolver(schema) });

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleFormSubmit = async (data: TLoginForm) => {
    try {
      const res = await signIn('email-based', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.status === 200) {
        router.push(callbackUrl);
      }
      if (res?.status === 401) {
        setSubmitError(res?.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/google/redirect`;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='grid w-64 gap-4 md:w-96'
      >
        <div className='grid gap-1'>
          <Label>E-mail</Label>
          <Input
            id='email'
            type='text'
            placeholder='e-mail'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label>Password</Label>
          <Input
            id='password'
            placeholder='password'
            type='password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-sm text-red-600'>{errors.password.message}</p>
          )}
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
        {submitError && (
          <p className='text-center text-sm text-red-600'>{submitError}</p>
        )}
      </form>
      <Button className='m-2 w-full' onClick={handleGoogleSignIn}>
        Sign in with google!
      </Button>
    </>
  );
}
