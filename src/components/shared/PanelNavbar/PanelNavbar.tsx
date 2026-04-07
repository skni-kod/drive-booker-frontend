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
    <header className='flex items-center justify-between rounded-xl bg-white px-5 py-4'>
      <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>

      <div className='flex items-center gap-3'>
        <button
          type='button'
          aria-label='Powiadomienia'
          className='rounded-full p-2 text-[#0B5DB8] transition hover:bg-blue-50 hover:text-[#084A93]'
        >
          <Bell size={18} />
        </button>

        <button
          type='button'
          aria-label='Ustawienia'
          className='rounded-full p-2 text-[#0B5DB8] transition hover:bg-blue-50 hover:text-[#084A93]'
        >
          <Settings size={18} />
        </button>

        <button
          type='button'
          aria-label='Menu profilu'
          className='flex items-center gap-1 text-[#0B5DB8]'
        >
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700'>
            {avatarInitial}
          </span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
