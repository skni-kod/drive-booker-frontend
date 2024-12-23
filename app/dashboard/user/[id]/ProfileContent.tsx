'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { User_CreditCard, User_Page } from '@/types/user_page';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DataTab from './tabs/DataTab';
import PaymentTab from './tabs/PaymentTab';

const fetchUserData = async (id: string): Promise<User_Page | null> => {
  try {
    const response = await axiosInstance.get(ApiRoutes.User(id));
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

const fetchUserCreditCard = async (
  id: string,
): Promise<User_CreditCard | null> => {
  try {
    const response = await axiosInstance.get(
      `${ApiRoutes.User(id)}/credit-card`,
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch credit card data:', error);
    return null;
  }
};

const ProfileContent = () => {
  const [user, setUser] = useState<User_Page | null>(null);
  const [creditCard, setCreditCard] = useState<User_CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const params = useParams();
  const userID = params.id as string;

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

  useEffect(() => {
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
    <div className='flex w-full gap-24'>
      <div className='flex h-[790px] w-[370px] flex-col items-center bg-gray-200 pt-10'>
        <div className='avatar'>
          <div className='h-[290px] w-[290px] rounded-sm bg-white'>
            {/* Image placeholder */}
          </div>
        </div>
        <div className='mt-5'>
          <h1 className='font-bold'>
            {user.name} {user.last_name}
          </h1>
          <h1 className='text-center'>{user.role}</h1>
        </div>
        <div className='mt-10 flex flex-col gap-3'>
          <Button className='px-20 py-5 font-bold'>ZMIEŃ ZDJĘCIE</Button>
          <Button className='py-5 font-bold'>UDOSTĘPNIJ</Button>
        </div>
      </div>
      <div className='h-[790px] flex-1 bg-gray-200 p-5'>
        <Tabs defaultValue='account' className='w-full'>
          <TabsList>
            <TabsTrigger value='account'>Moje dane</TabsTrigger>
            <TabsTrigger value='payment'>Dane płatności</TabsTrigger>
            <TabsTrigger value='settings'>Ustawienia</TabsTrigger>
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
