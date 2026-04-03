'use client';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/constants/menuConfig';
import { useUserRole } from '@/hooks/useUserRole';
import {
  BookOpen,
  Briefcase,
  Calendar,
  Car,
  Clock3,
  FileText,
  GraduationCap,
  LayoutGrid,
  Menu,
  School,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const roles = useUserRole();
  if (!roles) return null;

  const isActive = (path: string) => path === pathname;

  const getIcon = (label: string) => {
    switch (label) {
      case 'Panel':
        return <LayoutGrid className='h-6 w-6' />;
      case 'Kalendarz':
        return <Calendar className='h-6 w-6' />;
      case 'Mój kurs':
        return <BookOpen className='h-6 w-6' />;
      case 'Oczekujące':
        return <Clock3 className='h-6 w-6' />;
      case 'Kursy':
        return <BookOpen className='h-6 w-6' />;
      case 'Pracownicy':
        return <Briefcase className='h-6 w-6' />;
      case 'Pojazdy':
        return <Car className='h-6 w-6' />;
      case 'Kursanci':
        return <GraduationCap className='h-6 w-6' />;
      case 'Zgloszenia':
        return <FileText className='h-6 w-6' />;
      case 'Moja szkoła':
        return <School className='h-6 w-6' />;
      case 'Mój profil':
        return <User className='h-6 w-6' />;
      default:
        return null;
    }
  };

  let items = [];
  if (roles.includes('owner')) {
    items = menuItems.owner;
  } else if (roles.includes('instructor')) {
    items = menuItems.instructor;
  } else {
    items = menuItems.driver;
  }

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
        className={`fixed left-0 top-11 z-40 h-[calc(100vh-3rem)] w-[300px] bg-blue-600 transition-transform duration-300 xl:relative xl:top-0 xl:h-full xl:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        }`}
      >
        <div className='flex h-full flex-col items-center justify-between'>
          <div className='w-full'>
            <div className='mt-8 flex justify-center'>
              <Image
                src='/assets/icons/drive-booker-logo-white.svg'
                alt='DriveBooker'
                width={180}
                height={50}
              />
            </div>
            <div className='mt-12 space-y-5 px-6'>
              <ul className='space-y-4'>
                {items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    <li
                      key={item.label}
                      className='flex cursor-pointer items-center rounded-md py-2 transition-colors duration-200 hover:bg-blue-500'
                    >
                      <div className='text-white'>{getIcon(item.label)}</div>
                      <span
                        className={`ml-3 text-sm text-white sm:text-base md:text-lg xl:text-xl ${
                          isActive(item.href) ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
              {roles.includes('driver') && (
                <Button className='mt-6 w-full font-bold' variant={'white'}>
                  OPŁAĆ KURS
                </Button>
              )}
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-between gap-y-10 px-6'>
            {roles.includes('owner') ? (
              <div className='text-center text-white'>
                <h2 className='text-sm font-bold sm:text-base md:text-lg xl:text-xl'>
                  Aktualny pakiet PRO
                </h2>
                <p className='text-sm'>30 z 100</p>
                <p className='text-xs text-gray-200'>aktywnych kursantów</p>
                <hr className='my-2 border-white' />
                <Button variant={'white'} className='mt-2 w-full font-bold'>
                  ZMIEN PAKIET
                </Button>
              </div>
            ) : (
              <div className='my-10 flex h-[241px] w-[218px] items-end justify-center bg-white/20 font-bold text-white'>
                <h1>BANER REKLAMOWY</h1>
              </div>
            )}
            <Button
              className='mb-10 w-full text-sm font-bold'
              variant={'white'}
              onClick={logout}
            >
              WYLOGUJ
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
