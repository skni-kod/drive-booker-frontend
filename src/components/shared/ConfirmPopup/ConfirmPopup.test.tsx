import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmPopup } from './ConfirmPopup';

describe('ConfirmPopup Component', () => {
  it('should not render when isOpen is false', () => {
    render(
      <ConfirmPopup isOpen={false} onConfirm={() => {}} onCancel={() => {}} />,
    );

    expect(
      screen.queryByText('Czy na pewno chcesz zatwierdzić zmiany?'),
    ).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <ConfirmPopup isOpen={true} onConfirm={() => {}} onCancel={() => {}} />,
    );

    expect(
      screen.getByText('Czy na pewno chcesz zatwierdzić zmiany?'),
    ).toBeInTheDocument();
  });

  it('should call onConfirm when "Potwierdź" button is clicked', () => {
    const onConfirmMock = vi.fn();
    render(
      <ConfirmPopup
        isOpen={true}
        onConfirm={onConfirmMock}
        onCancel={() => {}}
      />,
    );

    fireEvent.click(screen.getByText('Potwierdź'));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when "Anuluj" button is clicked', () => {
    const onCancelMock = vi.fn();
    render(
      <ConfirmPopup
        isOpen={true}
        onConfirm={() => {}}
        onCancel={onCancelMock}
      />,
    );

    fireEvent.click(screen.getByText('Anuluj'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should display a custom message if provided', () => {
    const customMessage = 'Czy na pewno chcesz usunąć ten element?';
    render(
      <ConfirmPopup
        isOpen={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        message={customMessage}
      />,
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
