import { z, ZodType } from 'zod';
import { isPhoneValid, normalizePhone } from './isPhoneValid';

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
  phone: z.string().transform(normalizePhone).refine(isPhoneValid, {
    message: 'Nieprawidłowy numer telefonu!',
  }),
  phone_country: z
    .string()
    .regex(
      /^[a-z]{2}$/,
      'Kod kraju musi składać się z dokładnie 2 małych liter',
    ),
});
