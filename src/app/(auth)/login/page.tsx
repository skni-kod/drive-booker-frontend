import Image from 'next/image';
import LoginForm from './_components/LoginForm';

export default async function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Image
        src='/assets/icons/drive-booker-logo.svg'
        alt='DriveBooker Logo'
        width={200}
        height={60}
        className='mb-8'
      />
      <h1 className='text-3xl font-bold'>Witaj ponownie</h1>
      <p className='my-6 text-sm text-muted-foreground'>
        Zaloguj się aby korzystać z możliwości Drivebookera
      </p>
      <LoginForm />
    </main>
  );
}
