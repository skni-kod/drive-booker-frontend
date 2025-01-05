import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { FormField } from './FormField';

const TestWrapper = () => {
  const { register } = useForm<{ testField: string }>();
  return (
    <FormField
      id='testField'
      label='Test Label'
      type='email'
      register={register}
      error='This field is required'
      disabled={false}
    />
  );
};

describe('FormField', () => {
  it('renders the label and input correctly', () => {
    render(<TestWrapper />);
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    const error = screen.getByText('This field is required');

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'testField');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'testField');
    expect(input).toHaveAttribute('type', 'email');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-red-500');
  });

  it('disables the input when disabled is true', () => {
    const DisabledWrapper = () => {
      const { register } = useForm<{ testField: string }>();
      return (
        <FormField
          id='testField'
          label='Test Label'
          register={register}
          disabled
        />
      );
    };

    render(<DisabledWrapper />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
