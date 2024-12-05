'use client'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiRoutes } from "@/enums/routes.enums"
import axiosInstance from "@/lib/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import DataTab from "./tabs/DataTab"


interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    voivodship: string;
    city: string;
    zip_code: string;
    street: string;
    house_number: string;
}

const ProfilePage = () => {


    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);


    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`${ApiRoutes.User}/${id}`);
                const data = await response.data;
                setUser(data);
            } catch (error) {
                setError('Failed to fetch user data');
            }
        };


        fetchUserData();

    }, [id]);

    if (!user && !error) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div className="w-full flex gap-24">
                <div className="w-[370px] h-[790px] bg-gray-200 flex flex-col items-center pt-10">
                    <div className="avatar">
                        <div className="w-[290px] h-[290px] rounded-sm bg-white">

                        </div>
                    </div>
                    <div className="mt-5">
                        <h1 className="font-bold">{user?.name} {user?.last_name}</h1>
                        <h1 className="text-center">{user?.role}</h1>
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
                                id={user?.id}
                                name={user?.name}
                                last_name={user?.last_name}
                                email={user?.email}
                                phone_number={user?.phone_number}
                                voivodship={user?.voivodship}
                                city={user?.city}
                                zip_code={user?.zip_code}
                                street={user?.street}
                                house_number={user?.house_number}
                            />
                        </TabsContent>
                        <TabsContent value="payment">Payment.</TabsContent>
                        <TabsContent value="settings">Settings</TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage