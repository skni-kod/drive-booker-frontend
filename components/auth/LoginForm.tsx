'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApiRoutes } from '@/enums/routes.enums';
import { axiosInstance } from '@/lib/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import googleIcon from './googleIcon.svg';

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
      setSubmitError(null);
      await axiosInstance.get('/sanctum/csrf-cookie');
      const response = await axios.post(ApiRoutes.Login, data);
      console.log(response);
      if (response.status === 200) {
        router.push(callbackUrl);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Login error:', axiosError);
      setSubmitError(
        axiosError.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  const handleGoogleSignIn = async () => {
    await axiosInstance.get('/sanctum/csrf-cookie');
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

      <div className='my-6 flex w-full items-center justify-center'>
        <div className='w-full border-t border-black'></div>
        <span className='px-4 text-sm text-gray-500'>OR</span>
        <div className='w-full border-t border-black'></div>
      </div>

      <Button className='px-10 py-5' onClick={handleGoogleSignIn}>
        <span className='flex items-center justify-center space-x-3'>
          <Image src={googleIcon} alt='googleIcon' className='h-5 w-5'></Image>
          <span className='font-bold'>Google</span>
        </span>
      </Button>
    </>
  );
}
