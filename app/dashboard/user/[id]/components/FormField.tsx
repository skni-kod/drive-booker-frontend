import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormValues {
  [key: string]: string;
}

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
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
      <Label className='text-xl'>{label}</Label>
      <Input
        id={id as string}
        type={type}
        className='bg-white'
        {...register(id)}
        disabled={disabled}
      />
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
};

export default FormField;
