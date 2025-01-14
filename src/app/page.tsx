import { Button } from '@/components/ui/button';
import { UnAuthorizedRoute } from '@/enums/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid min-h-screen items-center justify-items-center'>
      <main className='flex items-center'>
        <ol className='list-inside list-decimal text-center'>
          <Button asChild>
            <Link href={UnAuthorizedRoute.Login}>LOGIN</Link>
          </Button>
          <li className='mb-2'>
            Get started by editing
            <code className='rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]'>
              app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </div>
  );
}
