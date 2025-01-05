import { DashboardComponent } from '@/app/dashboard/_components/DashboardComponent';
import { Userlist } from '@/app/dashboard/_components/client/UserList';
import ServerUserlist from '@/app/dashboard/_components/server/ServerUserList';

const DashboardPage = () => {
  return (
    <div className='bg-grey-lighter flex min-h-screen flex-col'>
      <h1>Zalogowany!</h1>
      <DashboardComponent />
      <Userlist />
      <ServerUserlist />
    </div>
  );
};
export default DashboardPage;
