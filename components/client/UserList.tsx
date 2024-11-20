'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const Userlist = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session?.user?.access_token) {
      axiosInstance
        .get('/api/user')
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Authentication failed. Please login again.</div>;
  }

  return (
    <div>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
};
