import { axiosInstance } from '@/lib/axiosInstance';

export default async function ServerUserlist() {
  try {
    const response = await axiosInstance.get('/api/user');
    const userData = response.data;

    return (
      <div className='bg-green-100'>
        Server side rendering GET /api/users
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return <div>Failed to fetch user data.</div>;
  }
}
