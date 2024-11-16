import { AuthorizedRoute } from '@/enums/routes.enums';
import { LogInIcon } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect(AuthorizedRoute.Dashboard);
  }

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
