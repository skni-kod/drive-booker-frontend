import { Badge } from '@/components/ui/badge';
import { Check, Clock, X } from 'lucide-react';

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <Badge
          variant='outline'
          className='flex items-center gap-1 border-yellow-200 bg-yellow-50 text-yellow-700'
        >
          <Clock className='h-3 w-3' />
          Pending
        </Badge>
      );
    case 'accepted':
      return (
        <Badge
          variant='outline'
          className='flex items-center gap-1 border-green-200 bg-green-50 text-green-700'
        >
          <Check className='h-3 w-3' />
          Accepted
        </Badge>
      );
    case 'rejected':
      return (
        <Badge
          variant='outline'
          className='flex items-center gap-1 border-red-200 bg-red-50 text-red-700'
        >
          <X className='h-3 w-3' />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};
