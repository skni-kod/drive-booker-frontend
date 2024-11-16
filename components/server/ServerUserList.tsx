import { axiosServerInstance } from '@/lib/axiosInstance';
import { getTokenFromSession } from '@/utils/authToken';

export default async function ServerUserlist() {
  try {
    const accessToken = await getTokenFromSession();

    const response = await axiosServerInstance(accessToken).get('/api/user');
    const userData = response.data;

    return (
      <div>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return <div>Failed to fetch user data.</div>;
  }
}
