import { Bell, ChevronDown, Settings } from 'lucide-react';

type PanelNavbarProps = {
  title: string;
  avatarInitial?: string;
};

export function PanelNavbar({
  title,
  avatarInitial = 'A',
}: Readonly<PanelNavbarProps>) {
  return (
    <header className='mt-4 flex items-center justify-between py-2 md:mt-6'>
      <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>

      <div className='flex items-center gap-4'>
        <div className='flex items-center'>
          <button
            type='button'
            aria-label='Powiadomienia'
            className='rounded-full p-2.5 text-[#0B5DB8] transition hover:bg-blue-50 hover:text-[#084A93]'
          >
            <Bell size={22} />
          </button>

          <button
            type='button'
            aria-label='Ustawienia'
            className='rounded-full p-2.5 text-[#0B5DB8] transition hover:bg-blue-50 hover:text-[#084A93]'
          >
            <Settings size={22} />
          </button>
        </div>

        <button
          type='button'
          aria-label='Menu profilu'
          className='flex items-center gap-1.5 text-[#0B5DB8]'
        >
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-base font-semibold text-gray-700'>
            {avatarInitial}
          </span>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}
