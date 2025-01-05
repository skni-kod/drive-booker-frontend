import { LogInIcon } from 'lucide-react';
import LoginForm from './_components/LoginForm';

export default async function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <LogInIcon />
      <h1 className='text-2xl font-bold'>Welcome back</h1>
      <p className='my-4 text-sm text-muted-foreground'>
        Log in to take advantage of DriveBooker&apos;s capabilities
      </p>
      <LoginForm />
    </main>
  );
}
