import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormValues {
  [key: string]: string;
}

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  error?: string;
  disabled?: boolean;
}

const FormField = <T extends FieldValues>({
  id,
  label,
  type = 'text',
  register,
  error,
  disabled = false,
}: FormFieldProps<T>) => {
  return (
    <div>
      <Label htmlFor={id as string} className='text-lg xl:text-xl'>
        {label}
      </Label>
      <Input
        id={id as string}
        type={type}
        className='bg-white text-sm sm:text-base'
        {...register(id)}
        disabled={disabled}
      />
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
};

export default FormField;
