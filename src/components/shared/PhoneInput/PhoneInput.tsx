'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMemo } from 'react';
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
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';

const ALLOWED_COUNTRIES = ['pl', 'ua', 'de'] as const;
export type AllowedCountry = (typeof ALLOWED_COUNTRIES)[number];

const isAllowedCountry = (iso2: string): iso2 is AllowedCountry =>
  ALLOWED_COUNTRIES.includes(iso2 as AllowedCountry);

export interface CustomPhoneInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  countryName: Path<T>;
  defaultCountry?: AllowedCountry;
}

export const PhoneInput = <T extends FieldValues>({
  id,
  label,
  error,
  countryName,
  defaultCountry = 'pl',
}: CustomPhoneInputProps<T>) => {
  const { setValue, getValues } = useFormContext<T>();
  const initialCountry = getValues(countryName);

  const filteredCountries = useMemo(
    () =>
      defaultCountries.filter((c) => isAllowedCountry(parseCountry(c).iso2)),
    [],
  );

  const { inputValue, handlePhoneValueChange, setCountry, country, inputRef } =
    usePhoneInput({
      value: getValues(id),
      defaultCountry: isAllowedCountry(initialCountry)
        ? initialCountry
        : defaultCountry,
      countries: filteredCountries,
      onChange: ({ phone, country: selectedCountry }) => {
        if (isAllowedCountry(selectedCountry.iso2)) {
          setValue(id, phone as PathValue<T, typeof id>);
          setValue(
            countryName,
            selectedCountry.iso2 as PathValue<T, typeof countryName>,
          );
        }
      },
    });

  const handleCountrySelect = (iso2: string) => {
    if (isAllowedCountry(iso2)) {
      setCountry(iso2);
      setValue(countryName, iso2 as PathValue<T, typeof countryName>);
    }
  };

  const selectedIso2 = isAllowedCountry(country.iso2)
    ? country.iso2
    : defaultCountry;

  return (
    <div>
      <Label htmlFor={id} className='text-lg xl:text-xl'>
        {label}
      </Label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-2 flex items-center'>
          <CountrySelector
            selectedCountry={selectedIso2}
            onSelect={({ iso2 }) => handleCountrySelect(iso2)}
            countries={filteredCountries}
          />
        </div>
        <Input
          id={id}
          type='tel'
          ref={inputRef}
          value={inputValue}
          onChange={handlePhoneValueChange}
          className='bg-white pl-16 text-sm sm:text-base'
        />
      </div>
      {error && <span className='text-sm text-red-500'>{error}</span>}
    </div>
  );
};
