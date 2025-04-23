'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMemo, useState } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import {
  CountrySelector,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';

const ALLOWED_COUNTRIES = ['pl', 'ua', 'de'] as const;
export type AllowedCountry = (typeof ALLOWED_COUNTRIES)[number];

const isAllowedCountry = (iso2: string): iso2 is AllowedCountry =>
  (ALLOWED_COUNTRIES as readonly string[]).includes(iso2);

export interface CustomPhoneInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  countryName: Path<T>;
}

export const PhoneInput = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  countryName,
}: CustomPhoneInputProps<T>) => {
  const { setValue } = useFormContext<T>();
  const [country, setCountry] = useState<AllowedCountry>('pl');

  const filteredCountries = useMemo(
    () =>
      defaultCountries.filter((c) => {
        const { iso2 } = parseCountry(c);
        return isAllowedCountry(iso2);
      }),
    [],
  );

  const handleCountryChange = (iso2: string) => {
    if (isAllowedCountry(iso2)) {
      setCountry(iso2);
      setValue(countryName, iso2 as PathValue<T, typeof countryName>);
    }
  };

  return (
    <div>
      <Label htmlFor={id} className='text-lg xl:text-xl'>
        {label}
      </Label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-2 flex items-center'>
          <CountrySelector
            selectedCountry={country}
            onSelect={({ iso2 }) => handleCountryChange(iso2)}
            countries={filteredCountries}
          />
        </div>
        <Input
          id={id}
          type='tel'
          {...register(id)}
          className='bg-white pl-16 text-sm sm:text-base'
        />
      </div>
      {error && <span className='text-sm text-red-500'>{error}</span>}
    </div>
  );
};
