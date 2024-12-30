'use client';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <div>
      {/* MOBILE NAVBAR */}
      <div className='fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white px-4 py-2 xl:hidden'>
        <div className='flex items-center justify-between'>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
          <h1 className='text-lg font-bold'>drive-booker</h1>
        </div>
      </div>

      {/* SIDE MENU */}
      <div
        className={`fixed left-0 top-11 z-40 h-[calc(100vh-3rem)] w-[300px] bg-gray-200 transition-transform duration-300 xl:relative xl:top-0 xl:h-full xl:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        }`}
      >
        <div className='flex h-full flex-col items-center justify-between'>
          <div>
            <div className='mt-10 h-24 w-52 bg-muted-foreground'></div>
            <div className='mt-10 space-y-5'>
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <div className='h-6 w-6 bg-muted-foreground'></div>
                  <Link href='/dashboard'>
                    <span
                      className={`ml-3 text-sm sm:text-base md:text-lg xl:text-xl ${isActive('/dashboard') ? 'font-bold' : 'font-normal'}`}
                    >
                      Panel
                    </span>
                  </Link>
                </li>
                <li className='flex items-center'>
                  <div className='h-6 w-6 bg-muted-foreground'></div>
                  <span className='ml-3 text-sm sm:text-base md:text-lg xl:text-xl'>
                    Kalendarz
                  </span>
                </li>
                <li className='flex items-center'>
                  <div className='h-6 w-6 bg-muted-foreground'></div>
                  <span className='ml-3 text-sm sm:text-base md:text-lg xl:text-xl'>
                    Mój kurs
                  </span>
                </li>
                <li className='flex items-center'>
                  <div className='h-6 w-6 bg-muted-foreground'></div>
                  <Link href={`/dashboard/profile`}>
                    <span
                      className={`ml-3 text-sm sm:text-base md:text-lg xl:text-xl ${isActive(`/dashboard/profile`) ? 'font-bold' : 'font-normal'}`}
                    >
                      Mój profil
                    </span>
                  </Link>
                </li>
              </ul>
              <Button className='text-sm font-bold'>OPŁAĆ KURS</Button>
            </div>
          </div>
          <div className='my-10 flex h-[241px] w-[218px] items-end justify-center bg-muted-foreground font-bold'>
            <h1>BANER REKLAMOWY</h1>
          </div>
          <div className='mb-10'>
            <Button className='text-sm font-bold' onClick={logout}>
              LOGOUT
            </Button>
          </div>
        </div>
      </div>

      {/* BLACK OVERLAY*/}
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/50 xl:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SideMenu;
