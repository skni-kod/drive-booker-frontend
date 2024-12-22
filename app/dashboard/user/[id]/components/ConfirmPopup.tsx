import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmPopup: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message = 'Czy na pewno chcesz zatwierdzić zmiany?',
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded bg-white p-8 shadow-md'>
        <h2 className='mb-4 text-xl font-bold'>{message}</h2>
        <div className='flex justify-end space-x-4'>
          <Button className='px-4 py-2 font-bold' onClick={onCancel}>
            Anuluj
          </Button>
          <Button className='px-4 py-2 font-bold' onClick={onConfirm}>
            Potwierdź
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
