import { getUserId } from '@/actions/getUserId';
import ProfileContent from './_components/ProfileContent';

const ProfilePage = async () => {
  const userID = await getUserId();
  return (
    <div>
      <ProfileContent userID={userID} />
    </div>
  );
};

export default ProfilePage;
