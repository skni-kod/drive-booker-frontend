'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User_Page } from "@/types/user_page";
import DataTab from "./tabs/DataTab";
import PaymentTab from "./tabs/PaymentTab";


interface ProfileContentProps {
    user: User_Page;
}

const ProfileContent = ({ user }: ProfileContentProps) => {
    return (
        <div className="w-full flex gap-24">
            <div className="w-[370px] h-[790px] bg-gray-200 flex flex-col items-center pt-10">
                <div className="avatar">
                    <div className="w-[290px] h-[290px] rounded-sm bg-white">
                        {/* Image placeholder */}
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="font-bold">
                        {user.name} {user.last_name}
                    </h1>
                    <h1 className="text-center">{user.role}</h1>
                </div>
                <div className="mt-10 flex flex-col gap-3">
                    <Button className="font-bold px-20 py-5">ZMIEŃ ZDJĘCIE</Button>
                    <Button className="font-bold py-5">UDOSTĘPNIJ</Button>
                </div>
            </div>
            <div className="h-[790px] bg-gray-200 p-5 flex-1">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                        <TabsTrigger value="account">Moje dane</TabsTrigger>
                        <TabsTrigger value="payment">Dane płatności</TabsTrigger>
                        <TabsTrigger value="settings">Ustawienia</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <DataTab
                            id={user.id}
                            name={user.name}
                            last_name={user.last_name}
                            email={user.email}
                            phone_number={user.phone_number}
                            voivodship={user.voivodship}
                            city={user.city}
                            zip_code={user.zip_code}
                            street={user.street}
                            house_number={user.house_number}
                        />
                    </TabsContent>
                    <TabsContent value="payment">
                        <PaymentTab
                            id={user.id}
                            card_first_name={user.card_first_name}
                            card_last_name={user.card_last_name}
                            card_number={user.card_number}
                            card_expiry_date={user.card_expiry_date}
                            card_cvv={user.card_cvv}
                        />
                    </TabsContent>
                    <TabsContent value="settings">Settings</TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfileContent;
