import { DashboardComponent } from '@/components/client/DashboardComponent';
import { Userlist } from '@/components/client/UserList';
import ServerUserlist from '@/components/server/ServerUserList';

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
