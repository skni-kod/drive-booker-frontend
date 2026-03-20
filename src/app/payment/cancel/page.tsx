import { Button } from '@/components/ui/button';
import { AuthorizedRoute } from '@/enums/routes';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-6 rounded-full bg-red-100 p-4 text-red-700'>
        <svg
          className='h-12 w-12'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          ></path>
        </svg>
      </div>
      <h1 className='mb-4 text-3xl font-bold'>Płatność anulowana</h1>
      <p className='mb-8 max-w-md text-gray-600'>
        Proces płatności został przerwany i żadne środki nie zostały pobrane z
        Twojego konta.
      </p>
      <Link href={AuthorizedRoute.Dashboard}>
        <Button variant='outline'>Wróć na stronę główną</Button>
      </Link>
    </div>
  );
}
