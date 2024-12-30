import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axiosInstance';
import Link from 'next/link';
import SingleCourseCard from './_components/SingleCourseCard';

export default async function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const response = await axiosInstance.get(`/api/courses/${id}`);
    const course = response.data.data;
    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <div className='my-16 flex w-4/5 flex-col justify-between gap-8 md:flex-row'>
          <div className='flex w-2/3 flex-col gap-4'>
            <h1 className='text-3xl font-bold'>{course.school.name}</h1>
            <h2 className='text-lg'>{course.school.address}</h2>
            <h1 className='text-xl font-semibold'>Opis</h1>
            <h2>
              Zapraszamy Cię do skorzystania z naszej oferty kursu na prawo
              jazdy kategorii B. Nasz ośrodek oferuje naukę jazdy z
              doświadczonymi instruktorami oraz nowoczesne samochody wyposażone
              w niezbędne systemy bezpieczeństwa. Przygotowujemy naszych
              kursantów do egzaminów państwowych, a także dbamy o to, aby
              nauczyć ich umiejętności jazdy bezpiecznej i odpowiedzialnej.
              Zapisz się już dziś i zdobądź prawo jazdy, które otworzy przed
              Tobą wiele nowych możliwości. E-learning – Ucz się w domu! Jeśli
              nie masz czasu na uczestnictwo w stacjonarnych wykładach,
              proponujemy naukę teorii w zaciszu swojego domu, dzięki
              interaktywnemu programowi e-learningowemu. To forma nauki, która
              daje swobodę i komfort, umożliwiając naukę wtedy i tam, gdzie
              chcesz. Program e-learningowy składa się z lekcji, ćwiczeń oraz
              dostępu do pełnej bazy pytań. Dzięki temu, że program działa na
              wielu urządzeniach mobilnych, wystarczy tylko dostęp do Internetu.
              Obsługa programu jest prosta i intuicyjna, a postępy w nauce są
              rejestrowane na bieżąco, umożliwiając robienie przerw w dowolnym
              momencie.
            </h2>
          </div>
          <SingleCourseCard
            date={course.start_date}
            category={'X'}
            price={course.price}
          />
        </div>
        <div className='grid w-full place-content-center gap-3 bg-slate-200 p-16'>
          <h1 className='text-center text-3xl font-semibold'>
            Zapisz się na kurs!
          </h1>
          <h2 className='text-md text-center'>
            Wypełnij formularz zgłoszeniowy znajdujący się obok. W ciągu 24
            godzin skontaktujemy się z Tobą, w celu potwierdzenia Twojego
            zgłoszenia się na kurs oraz poinformujemy o najbliższych zajęciach!
          </h2>
          <div className='flex flex-row gap-2'>
            <Input placeholder='Imię' />
            <Input placeholder='Nazwisko' />
          </div>
          <div className='flex flex-row gap-2'>
            <Input placeholder='Adres e-mail' />
            <Input placeholder='Numer telefonu' />
          </div>
          <div className='flex flex-row gap-2'>
            <Checkbox id='agreement' />
            <Label htmlFor='agreement' className='text-xs'>
              Wyrażam zgodę na przetwarzenie moich danych przez Ośrodek
              Szkolenia Kierowców “Nazwa szkoły” w następujących celach:
              nawiązania kontaktu podczas realizacji kursu / szkolenia /
              kwalifikacji; zapisu na egzamin państwowy do wybranego
              Wojewódzkiego Ośrodka Ruchu Drogowego; zapisu na jazdy w warunkach
              specjalnych; wyrobieniu Profilu Kandydata na Kierowcą w wybranym
              Wydziale Komunikacji; zapisu na jazdy próbne przed egzaminem
              państwowym w wybranym Wojewódzkim Ośrodku Ruchu Drogowego;
              zgłoszenia do ubezpieczenia wynikającego ze skierowania na
              szkolenie oraz innych wynikających z prawidłowego wykonania
              usługi. Dane osobowe podaję dobrowolnie i oświadczam, że są one
              zgodne z prawdą. Zapoznałem/am się z treścią klauzuli
              informacyjnej, w tym z informacją o celu i sposobach przetwarzania
              danych osobowych oraz prawie dostępu do treści swoich danych i
              prawie ich poprawiania.
            </Label>
          </div>
          <Button className='w-full sm:w-2/5'>ZAPISUJĘ SIĘ!</Button>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <p>Kurs z takim ID nie istnieje lub coś poszło nie tak</p>
        <Button asChild>
          <Link href={'/courses'}>WRÓC DO WYBORU KURSÓW</Link>
        </Button>
      </main>
    );
  }
}
