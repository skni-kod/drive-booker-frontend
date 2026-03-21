import { Button } from '@/components/ui/button';
import { UnAuthorizedRoute } from '@/enums/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid min-h-screen items-center justify-items-center'>
      <main className='flex flex-row items-center gap-10'>
        <Button size={'lg'} asChild>
          <Link href={UnAuthorizedRoute.Login}>WEWNĘTRZNY SYSTEM</Link>
        </Button>
        <Button size={'lg'} asChild>
          <Link href={UnAuthorizedRoute.Courses}>DOSTĘPNE KURSY</Link>
        </Button>
      </main>
    </div>
  );
}
