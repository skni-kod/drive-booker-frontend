import { z, ZodType } from 'zod';

export const CourseRegistrationSchema: ZodType = z.object({
  name: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki!')
    .max(30, 'Imię może mieć maksymalnie 30 znaków!')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Imię może zawierać tylko litery!'),
  last_name: z
    .string()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki!')
    .max(30, 'Nazwisko może mieć maksymalnie 30 znaków!')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Nazwisko może zawierać tylko litery!'),
  email: z.string().email('Podaj poprawny adres email!'),
  phone: z
    .string()
    .regex(
      /^\+?\d{9,15}$/,
      'Numer telefonu musi mieć od 9 do 15 cyfr i może zaczynać się od +!',
    ),
});
