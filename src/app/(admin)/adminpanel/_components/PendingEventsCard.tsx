'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getPendingEvents } from '@/services/events/getPendingEvents';
import { handleEventChange } from '@/services/events/handleEventStatus';
import { adminEvent } from '@/services/events/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import { EventTable } from './EventTable';

export default function PendingEventsCard() {
  const [events, setEvents] = useState<adminEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    action: 'accept' | 'reject';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getPendingEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleStatusChange = async (
    id: string,
    action: 'accept' | 'reject',
  ) => {
    try {
      handleEventChange(id, action);
      const updatedEvents = await getPendingEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to update event status');
    } finally {
      setAlertOpen(false);
      setSelectedEvent(null);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            {error && <Badge variant='destructive'>{error}</Badge>}
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
          <EventTable
            events={filteredEvents}
            handleActionClick={(id, action) => {
              setSelectedEvent({ id, action });
              setAlertOpen(true);
            }}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        selectedEvent={selectedEvent}
        onConfirm={handleStatusChange}
        onCancel={() => {
          setAlertOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
}
