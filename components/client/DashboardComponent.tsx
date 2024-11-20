'use client';

import { useSession } from 'next-auth/react';

export const DashboardComponent = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Authentication failed. Please login again.</div>;
  }

  return (
    <div className='grid grid-cols-2 p-4 text-white'>
      <div className='text-center'>
        <h1 className='text-xl font-bold text-black'>
          Hi {session?.user?.user?.name}!
        </h1>
      </div>
      <div>
        <p className='text-black'>Protected client page</p>
        <pre className='text-black'>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};
