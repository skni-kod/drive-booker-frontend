'use client';

import { PanelNavbar } from '@/components/shared/PanelNavbar';
import { usePathname } from 'next/navigation';

const navbarTitles: Record<string, string> = {
  '/dashboard': 'Witaj Adam!',
  '/dashboard/profile': 'Mój profil',
  '/dashboard/calendar': 'Kalendarz',
};

export default function DashboardNavbar() {
  const pathname = usePathname();

  const title = navbarTitles[pathname] ?? 'Panel użytkownika';

  return <PanelNavbar title={title} />;
}
