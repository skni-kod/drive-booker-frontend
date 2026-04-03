'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { adminEvent } from '@/services/events/types';
import { Check, Loader, MoreHorizontal, X } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

interface EventTableProps {
  events: adminEvent['data'];
  handleActionClick: (id: string, action: 'accept' | 'reject') => void;
  isLoading: boolean;
}

export const EventTable: React.FC<EventTableProps> = ({
  events,
  handleActionClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='flex h-32 items-center justify-center'>
        <Loader className='animate-spin' data-testid='loader' />
      </div>
    );
  }
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Instructor Name</TableHead>
            <TableHead>Driver Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events && events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className='font-medium'>{event.title}</TableCell>
                <TableCell>{event.instructor.name}</TableCell>
                <TableCell>{event.driver.name}</TableCell>
                <TableCell>{new Date(event.start).toLocaleString()} </TableCell>
                <TableCell>{new Date(event.end).toLocaleString()} </TableCell>
                <TableCell>
                  <StatusBadge status={event.status} />
                </TableCell>
                <TableCell className='text-right'>
                  {event.status === 'pending' ? (
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800'
                        onClick={() => handleActionClick(event.id, 'accept')}
                      >
                        <Check className='mr-1 h-4 w-4' />
                        Accept
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800'
                        onClick={() => handleActionClick(event.id, 'reject')}
                      >
                        <X className='mr-1 h-4 w-4' />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                        >
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reset Status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='h-24 text-center'>
                No events found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
