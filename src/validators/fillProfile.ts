import { z, ZodType } from 'zod';

export const FillProfileDataSchema: ZodType = z.object({
  voivodship: z
    .string()
    .min(1, 'Województwo jest wymagane!')
    .max(30, 'Województwo może mieć maksymalnie 30 znaków!'),

  city: z
    .string()
    .min(1, 'Miasto jest wymagane!')
    .max(30, 'Miasto może mieć maksymalnie 30 znaków!'),

  street: z
    .string()
    .min(1, 'Ulica jest wymagana!')
    .max(30, 'Ulica może mieć maksymalnie 30 znaków!'),

  house_number: z
    .string()
    .regex(
      /^\d+[a-zA-Z]?$/,
      'Numer domu musi być liczbą, opcjonalnie z literą!',
    ),

  zip_code: z
    .string()
    .regex(/^\d{2}-\d{3}$/, 'Kod pocztowy musi mieć format XX-XXX!'),
});
