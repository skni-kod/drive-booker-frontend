'use client';

import { axiosInstance } from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

export const Userlist = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/api/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className='bg-red-100'>
      Client side rendering GET /api/users
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
};
