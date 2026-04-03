import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EventTable } from './EventTable';

const mockEvents = [
  {
    id: '1',
    title: 'Sample Event',
    instructor: { id: '123', name: 'Alice' },
    driver: { id: '456', name: 'Bob' },
    start: '2025-05-25T08:00:00Z',
    end: '2025-05-25T10:00:00Z',
    created_at: '2025-05-24T08:00:00Z',
    updated_at: '2025-05-24T08:00:00Z',
    status: 'pending' as const,
  },
];

describe('EventTable', () => {
  it('renders loader when isLoading is true', () => {
    render(
      <EventTable events={[]} handleActionClick={vi.fn()} isLoading={true} />,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument(); // <Loader className="animate-spin" data-testid='loader' />
  });

  it('renders table with data', () => {
    render(
      <EventTable
        events={mockEvents}
        handleActionClick={vi.fn()}
        isLoading={false}
      />,
    );

    expect(screen.getByText('Sample Event')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('calls handleActionClick when Accept button is clicked', () => {
    const handleActionClick = vi.fn();

    render(
      <EventTable
        events={mockEvents}
        handleActionClick={handleActionClick}
        isLoading={false}
      />,
    );

    fireEvent.click(screen.getByText('Accept'));
    expect(handleActionClick).toHaveBeenCalledWith('1', 'accept');
  });

  it('calls handleActionClick when Reject button is clicked', () => {
    const handleActionClick = vi.fn();

    render(
      <EventTable
        events={mockEvents}
        handleActionClick={handleActionClick}
        isLoading={false}
      />,
    );

    fireEvent.click(screen.getByText('Reject'));
    expect(handleActionClick).toHaveBeenCalledWith('1', 'reject');
  });

  it('displays "No events found." when events list is empty', () => {
    render(
      <EventTable events={[]} handleActionClick={vi.fn()} isLoading={false} />,
    );

    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });
});
