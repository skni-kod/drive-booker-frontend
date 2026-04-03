'use client';

import { PaginationWithLinks } from '@/components/shared/PaginationWithLinks';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useEventStatusMutation } from '@/hooks/useEventStatusMutation';
import { usePendingEvents } from '@/services/events/getPendingEvents';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { EventTable } from '../EventTable';

export const PendingEventsCard = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    action: 'accept' | 'reject';
  } | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch events using react query
  const { data: events, isLoading, error } = usePendingEvents(page);

  // Mutation for changing event status
  const { mutate } = useEventStatusMutation();

  const filteredEvents =
    events?.data.filter((event) =>
      event.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    ) || [];

  return (
    <div className='container mx-auto max-w-6xl py-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl'>Event Approval</CardTitle>
              <CardDescription>
                Review and manage pending event submissions
              </CardDescription>
            </div>
            {isLoading && <Badge variant='secondary'>Loading...</Badge>}
            {error && <Badge variant='destructive'>{error.message}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search events...'
                className='pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {events && (
            <EventTable
              events={filteredEvents}
              handleActionClick={(id, action) => {
                setSelectedEvent({ id, action });
                setAlertOpen(true);
              }}
              isLoading={isLoading}
            />
          )}
        </CardContent>
        {events && events.data.length > 0 && (
          <div data-testid='pagination-component'>
            <PaginationWithLinks
              page={events.meta.current_page}
              totalCount={events.meta.total}
              pageSize={events.meta.per_page}
            />
          </div>
        )}
      </Card>
      <ConfirmationDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        selectedEvent={selectedEvent}
        onConfirm={(id, action) => mutate({ id, action })}
        onCancel={() => {
          setAlertOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};
