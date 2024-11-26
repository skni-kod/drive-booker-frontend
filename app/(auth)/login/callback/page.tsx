'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        const result = await signIn('google-based', {
          token,
          redirect: false,
        });
        if (result?.ok) {
          router.push('/dashboard');
        } else {
          console.error('Failed to sign in');
          router.push('/login');
        }
      } else {
        console.error('No token found in query parameters');
        router.push('/login');
      }
    };

    handleAuth();
  }, [router]);

  return <p>Authenticating...</p>;
}
