import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmationDialog } from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const baseProps = {
    open: true,
    onOpenChange: vi.fn(),
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };

  it('renders accept dialog correctly', () => {
    render(
      <ConfirmationDialog
        {...baseProps}
        selectedEvent={{ id: '123', action: 'accept' }}
      />,
    );

    expect(screen.getByText('Accept Event')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to approve this event/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes, Approve')).toBeInTheDocument();
  });

  it('renders reject dialog correctly', () => {
    render(
      <ConfirmationDialog
        {...baseProps}
        selectedEvent={{ id: '123', action: 'reject' }}
      />,
    );

    expect(screen.getByText('Reject Event')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to reject this event/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Yes, Reject')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <ConfirmationDialog
        {...baseProps}
        selectedEvent={{ id: '123', action: 'accept' }}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(baseProps.onCancel).toHaveBeenCalled();
  });

  it('calls onConfirm and onCancel when accept button is clicked', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ConfirmationDialog
        {...baseProps}
        selectedEvent={{ id: '123', action: 'accept' }}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(screen.getByText('Yes, Approve'));
    expect(onConfirm).toHaveBeenCalledWith('123', 'accept');
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onConfirm and onCancel when reject button is clicked', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ConfirmationDialog
        {...baseProps}
        selectedEvent={{ id: '123', action: 'reject' }}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(screen.getByText('Yes, Reject'));
    expect(onConfirm).toHaveBeenCalledWith('123', 'reject');
    expect(onCancel).toHaveBeenCalled();
  });
});
