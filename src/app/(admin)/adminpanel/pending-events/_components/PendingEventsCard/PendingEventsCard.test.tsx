import { useEventStatusMutation } from '@/hooks/useEventStatusMutation';
import { setupNextNavigationMock } from '@/lib/tests/mocks/nextNavigationMock';
import { usePendingEvents } from '@/services/events/getPendingEvents';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PendingEventsCard } from './PendingEventsCard';

vi.mock('@/services/events/getPendingEvents');
vi.mock('@/hooks/useEventStatusMutation');
setupNextNavigationMock();

const mockedUsePendingEvents = usePendingEvents as unknown as ReturnType<
  typeof vi.fn
>;
const mockedUseEventStatusMutation =
  useEventStatusMutation as unknown as ReturnType<typeof vi.fn>;

const queryClient = new QueryClient();

const renderWithProvider = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <PendingEventsCard />
    </QueryClientProvider>,
  );

const fakeEvents = {
  data: [
    {
      id: '1',
      title: 'Driving Safety Seminar',
      start: '2025-01-01T10:00:00Z',
      end: '2025-01-01T12:00:00Z',
      driver: { id: 'd1', name: 'John Driver' },
      instructor: { id: 'i1', name: 'Anna Instructor' },
      created_at: '2025-01-01T09:00:00Z',
      updated_at: '2025-01-01T09:30:00Z',
      status: 'pending',
    },
  ],
  links: {
    first: '/events?page=1',
    last: '/events?page=2',
    prev: null,
    next: '/events?page=2',
  },
  meta: {
    current_page: 1,
    from: 1,
    path: '/events',
    per_page: 10,
    to: 10,
    total: 20,
  },
};

describe('PendingEventsCard', () => {
  beforeEach(() => {
    mockedUseEventStatusMutation.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it('renders loading state', () => {
    mockedUsePendingEvents.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUsePendingEvents.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Fetch failed' },
    });

    renderWithProvider();

    expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument();
  });

  it('renders event table when events are fetched', () => {
    mockedUsePendingEvents.mockReturnValue({
      data: fakeEvents,
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByText('Driving Safety Seminar')).toBeInTheDocument();
  });

  it('renders pagination when events exist', () => {
    mockedUsePendingEvents.mockReturnValue({
      data: fakeEvents,
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
  });

  it('filters events by search', async () => {
    mockedUsePendingEvents.mockReturnValue({
      data: fakeEvents,
      isLoading: false,
      error: null,
    });

    renderWithProvider();

    const searchInput = screen.getByPlaceholderText(/Search events/i);
    fireEvent.change(searchInput, { target: { value: 'Driving' } });

    await waitFor(() => {
      expect(screen.getByText('Driving Safety Seminar')).toBeInTheDocument();
    });
  });

  it('opens confirmation dialog on action click', async () => {
    render(<PendingEventsCard />);

    // click the Accept button to trigger dialog
    const acceptButton = screen.getAllByRole('button', { name: /accept/i })[0];
    fireEvent.click(acceptButton);

    await waitFor(() => {
      expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });

    expect(
      screen.getByRole('button', { name: /Yes, approve/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
});
