import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
        return NextResponse.json({ message: 'No user ID' }, { status: 400 });
    }

    try {
        const formData = await request.json();
        const response = await axiosInstance.post(`${ApiRoutes.User}/${userId}`, formData);
        return NextResponse.json(response.data, { status: 200 });
    } catch (e) {
        console.error('POST Error:', e);
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
}

