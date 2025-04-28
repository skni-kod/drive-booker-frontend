import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEvent: { id: string; action: 'accept' | 'reject' } | null;
  onConfirm: (id: string, newStatus: 'accept' | 'reject') => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  selectedEvent,
  onConfirm,
  onCancel,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selectedEvent?.action === 'accept'
              ? 'Accept Event'
              : 'Reject Event'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {selectedEvent?.action === 'accept'
              ? 'Are you sure you want to approve this event? This will make it visible to all users.'
              : 'Are you sure you want to reject this event? The organizer will be notified.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (selectedEvent) {
                onConfirm(
                  selectedEvent.id,
                  selectedEvent.action === 'accept' ? 'accept' : 'reject',
                );
                onCancel();
              }
            }}
            className={
              selectedEvent?.action === 'accept'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }
          >
            {selectedEvent?.action === 'accept'
              ? 'Yes, Approve'
              : 'Yes, Reject'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
