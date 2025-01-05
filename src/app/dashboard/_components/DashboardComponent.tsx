import { getSession } from '@/actions/getSession';

export const DashboardComponent = async () => {
  const session = await getSession();

  return (
    <div className='grid grid-cols-2 p-4 text-white'>
      <div>
        <p className='text-black'>Dane zawarte w sesji</p>
        <pre className='text-black'>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};
