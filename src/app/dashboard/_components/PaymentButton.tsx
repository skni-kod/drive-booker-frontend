'use client';

import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axiosInstance';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  priceId: string;
}

export default function PaymentButton({ priceId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/driver/checkout', {
        price_id: priceId,
      });

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      console.error('Błąd podczas inicjalizacji płatności:', error);
      toast.error(
        'Nie można rozpocząć procesu płatności. Spróbuj ponownie później.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className='text-sm font-bold'
    >
      {loading ? 'Przetwarzanie...' : 'OPŁAĆ KURS'}
    </Button>
  );
}
