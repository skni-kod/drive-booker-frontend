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
type AllowedCountry = (typeof ALLOWED_COUNTRIES)[number];

export interface CustomPhoneInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  countryName?: Path<T>;
}

export const PhoneInput = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  countryName = 'phone_country' as Path<T>,
}: CustomPhoneInputProps<T>) => {
  const { setValue } = useFormContext<T>();
  const [country, setCountry] = useState<AllowedCountry>('pl');

  const filteredCountries = useMemo(
    () =>
      defaultCountries.filter((country) => {
        const { iso2 } = parseCountry(country);
        return ALLOWED_COUNTRIES.includes(iso2 as AllowedCountry);
      }),
    [],
  );

  const handleCountryChange = (iso2: string) => {
    const newCountry = iso2 as AllowedCountry;
    setCountry(newCountry);
    setValue(countryName, newCountry as PathValue<T, Path<T>>);
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
