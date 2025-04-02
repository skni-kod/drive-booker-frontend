'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import {
  CountryIso2,
  CountrySelector,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';

interface PhoneFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  defaultCountry?: CountryIso2;
  setValue: (name: Path<T>, value: any) => void;
}

export const PhoneField = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  defaultCountry = 'pl',
  setValue,
}: PhoneFieldProps<T>) => {
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['pl', 'ua', 'gb'].includes(iso2);
  });

  const { inputValue, handlePhoneValueChange, country, setCountry } =
    usePhoneInput({
      defaultCountry,
      value: '',
      countries: countries,
      onChange: (data) => {},
    });

  console.log(country.iso2);

  return (
    <div>
      <Label htmlFor={id as string} className='text-lg xl:text-xl'>
        {label}
      </Label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-2 flex items-center'>
          <CountrySelector
            selectedCountry={country.iso2}
            onSelect={({ iso2 }) => {
              setCountry(iso2);
              setValue('phone_country' as Path<T>, iso2);
            }}
            countries={countries}
          />
        </div>
        <Input
          id={id as string}
          type='tel'
          {...register(id)}
          className='bg-white pl-16 text-sm sm:text-base'
        />
      </div>
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
};
