//! DELETE LATER ONLY FOR TESTING PURPOSE
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  cPassword: string;
};

const schema: ZodType<TRegisterForm> = z
  .object({
    name: z.string().min(5, { message: 'Name is required' }),
    email: z.string().email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
        message:
          'Password must contain at least one number and one special character',
      }),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: TRegisterForm) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await response.json();
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='bg-grey-lightest h-screen font-sans antialiased'>
      <div className='bg-grey-lightest w-full' style={{ paddingTop: '4rem' }}>
        <div className='container mx-auto py-8'>
          <div className='mx-auto w-5/6 rounded bg-white shadow lg:w-1/2'>
            <div className='border-grey-lighter border-b px-8 py-4 text-xl text-black'>
              Register
            </div>
            <form
              className='px-8 py-4'
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className='mb-4 flex'>
                <div className='mr-1 w-full'>
                  <label className='text-grey-darker mb-2 block text-sm font-bold'>
                    Name
                  </label>
                  <input
                    className='text-grey-darker w-full appearance-none rounded border px-3 py-2'
                    id='name'
                    type='text'
                    placeholder='Full name'
                    {...register('name')}
                  />
                  {errors.name ? (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.name?.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className='mb-4'>
                <label className='text-grey-darker mb-2 block text-sm font-bold'>
                  Email Address
                </label>
                <input
                  className='text-grey-darker w-full appearance-none rounded border px-3 py-2'
                  id='email'
                  type='email'
                  placeholder='Your email address'
                  {...register('email')}
                />
                {errors.email ? (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.email?.message}
                  </p>
                ) : null}
              </div>
              <div className='mb-4'>
                <label className='text-grey-darker mb-2 block text-sm font-bold'>
                  Password
                </label>
                <input
                  className='text-grey-darker w-full appearance-none rounded border px-3 py-2'
                  id='password'
                  type='password'
                  placeholder='Your secure password'
                  {...register('password')}
                />
                <p className='text-grey mt-1 text-xs'>At least 6 characters</p>
                {errors.password ? (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.password?.message}
                  </p>
                ) : null}
              </div>
              <div className='mb-4'>
                <label className='text-grey-darker mb-2 block text-sm font-bold'>
                  Confirm Password
                </label>
                <input
                  className='text-grey-darker w-full appearance-none rounded border px-3 py-2'
                  id='cPassword'
                  type='password'
                  placeholder='Your secure password'
                  {...register('cPassword')}
                />
                {errors.cPassword ? (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.cPassword?.message}
                  </p>
                ) : null}
              </div>
              <div className='mt-8 flex items-center justify-between'>
                <button
                  className='hover:bg-blue-dark rounded-full bg-blue-500 px-4 py-2 font-bold text-white'
                  onClick={() => console.log('eer')}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <p className='my-4 text-center'>
            <Link
              href='/login'
              className='text-grey-dark hover:text-grey-darker text-sm no-underline'
            >
              I already have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export { RegisterForm };
