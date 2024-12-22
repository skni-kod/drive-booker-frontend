import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const SideMenu = () => {
  return (
    <div className='flex h-screen w-[300px] justify-center bg-gray-200'>
      <div className='flex w-full flex-col items-center justify-between'>
        <div>
          <div className='mt-10 h-24 w-52 bg-muted-foreground'></div>
          <div className='mt-10 space-y-5'>
            <ul className='space-y-4'>
              <li className='flex items-center'>
                <div className='h-6 w-6 bg-muted-foreground'></div>
                <span className='ml-3'>Panel</span>
              </li>

              <li className='flex items-center'>
                <div className='h-6 w-6 bg-muted-foreground'></div>
                <span className='ml-3'>Kalendarz</span>
              </li>

              <li className='flex items-center'>
                <div className='h-6 w-6 bg-muted-foreground'></div>
                <span className='ml-3'>Mój kurs</span>
              </li>

              <li className='flex items-center'>
                <div className='h-6 w-6 bg-muted-foreground'></div>
                <span className='ml-3'>Mój profil</span>
              </li>
            </ul>
            <Button className='font-bold'>OPŁAĆ KURS</Button>
          </div>
        </div>
        <div className='mb-20 flex h-[241px] w-[218px] items-end justify-center bg-muted-foreground font-bold'>
          <h1>BANER REKLAMOWY</h1>
        </div>
        <div className='mb-10'>
          <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            LOGOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
