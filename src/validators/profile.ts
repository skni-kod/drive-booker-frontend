import { z, ZodType } from 'zod';
import { normalizePhone, isPhoneValid } from './isPhoneValid';

export const ProfileDataSchema: ZodType = z.object({
  name: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki!')
    .max(30, 'Imię może mieć maksymalnie 30 znaków!')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Imię może zawierać tylko litery!'),

  voivodship: z
    .string()
    .min(1, 'Województwo jest wymagane!')
    .max(30, 'Województwo może mieć maksymalnie 30 znaków!'),

  zip_code: z
    .string()
    .regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi mieć format XX-XXX!'),

  house_number: z
    .string()
    .regex(
      /^\d+[a-zA-Z]?$/,
      'Numer domu musi być liczbą, opcjonalnie z literą!',
    ),

  phone_number: z.string().transform(normalizePhone).refine(isPhoneValid, {
    message: 'Nieprawidłowy numer telefonu!',
  }),

  phone_country: z
    .string()
    .regex(
      /^[a-z]{2}$/,
      'Kod kraju musi składać się z dokładnie 2 małych liter',
    ),

  last_name: z
    .string()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki!')
    .max(30, 'Nazwisko może mieć maksymalnie 30 znaków!')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Nazwisko może zawierać tylko litery!'),

  email: z.string().email('Podaj poprawny adres email!'),

  city: z
    .string()
    .min(1, 'Miasto jest wymagane!')
    .max(30, 'Miasto może mieć maksymalnie 30 znaków!'),

  street: z
    .string()
    .min(1, 'Ulica jest wymagana!')
    .max(30, 'Ulica może mieć maksymalnie 30 znaków!'),
});

export const ProfilePaymentSchema: ZodType = z.object({
  card_first_name: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki!')
    .max(30, 'Imię może mieć maksymalnie 30 znaków!')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Imię może zawierać tylko litery!'),

  card_number: z
    .string()
    .regex(/^\d{16}$/, 'Numer karty musi składać się z 16 cyfr!'),

  card_cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'CVV musi składać się z 3 lub 4 cyfr!'),

  card_last_name: z
    .string()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .max(30, 'Nazwisko może mieć maksymalnie 30 znaków')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'Nazwisko może zawierać tylko litery!'),

  card_expiry_date: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Data ważności musi mieć format MM/RR'),
});
