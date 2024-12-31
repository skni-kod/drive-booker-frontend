'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchUserCreditCard } from '@/services/profile/fetchUserCreditCard';
import { fetchUserData } from '@/services/profile/fetchUserData';
import { UserCreditCard, UserPage } from '@/types/user';
import { useEffect, useState } from 'react';
import DataTab from './tabs/DataTab';
import PaymentTab from './tabs/PaymentTab';

const ProfileContent = ({ userID }: { userID: string }) => {
  const [user, setUser] = useState<UserPage | null>(null);
  const [creditCard, setCreditCard] = useState<UserCreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, userCreditCard] = await Promise.all([
          fetchUserData(userID),
          fetchUserCreditCard(userID),
        ]);
        setUser(userData);
        setCreditCard(userCreditCard);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userID) return;
    setIsLoading(true);
    fetchData();
  }, [userID, updateTrigger]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Failed to load user data.</div>;
  }

  return (
    <div className='flex flex-col gap-10 lg:flex-row'>
      {/* Left Section */}
      <div className='flex flex-col items-center bg-gray-200 py-10 lg:h-[790px] lg:w-[370px]'>
        <div className='avatar'>
          <div className='h-[200px] w-[200px] rounded-sm bg-white sm:h-[290px] sm:w-[290px]'></div>
        </div>
        <div className='mt-5 text-center'>
          <h1 className='text-lg font-bold sm:text-xl'>
            {user.name} {user.last_name}
          </h1>
          <h1 className='text-sm sm:text-base md:text-lg xl:text-xl'>
            {user.role}
          </h1>
        </div>

        <div className='mt-10 flex flex-col gap-3'>
          <Button className='px-10 py-3 font-bold'>ZMIEŃ ZDJĘCIE</Button>
          <Button className='py-3 font-bold'>UDOSTĘPNIJ</Button>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex-1 bg-gray-200 p-5'>
        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='flex flex-col sm:flex-row'>
            <TabsTrigger value='account' className='text-xl xl:text-2xl'>
              Moje dane
            </TabsTrigger>
            <TabsTrigger value='payment' className='text-xl xl:text-2xl'>
              Dane płatności
            </TabsTrigger>
            <TabsTrigger value='settings' className='text-xl xl:text-2xl'>
              Ustawienia
            </TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <DataTab
              userID={userID}
              name={user.name}
              last_name={user?.last_name}
              email={user.email}
              phone_number={user?.phone_number}
              voivodship={user?.voivodship}
              city={user?.city}
              zip_code={user?.zip_code}
              street={user?.street}
              house_number={user?.house_number}
              onUpdate={() => setUpdateTrigger((prev) => prev + 1)}
            />
          </TabsContent>
          <TabsContent value='payment'>
            <PaymentTab
              userID={userID}
              card_first_name={creditCard?.card_first_name}
              card_last_name={creditCard?.card_last_name}
              card_number={creditCard?.card_number}
              card_expiry_date={creditCard?.card_expiry_date}
              card_cvv={creditCard?.card_cvv}
              onUpdate={() => setUpdateTrigger((prev) => prev + 1)}
            />
          </TabsContent>
          <TabsContent value='settings'>Settings</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default ProfileContent;
