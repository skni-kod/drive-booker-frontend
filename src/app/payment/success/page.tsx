import { Button } from '@/components/ui/button';
import { AuthorizedRoute } from '@/enums/routes';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-6 rounded-full bg-green-100 p-4 text-green-700'>
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
            d='M5 13l4 4L19 7'
          ></path>
        </svg>
      </div>
      <h1 className='mb-4 text-3xl font-bold'>Płatność zakończona sukcesem!</h1>
      <p className='mb-8 max-w-md text-gray-600'>
        Dziękujemy za opłacenie kursu. Twój dostęp zostanie aktywowany w ciągu
        kilku minut.
      </p>
      <Link href={AuthorizedRoute.Dashboard}>
        <Button>Przejdź do panelu kursanta</Button>
      </Link>
    </div>
  );
}
