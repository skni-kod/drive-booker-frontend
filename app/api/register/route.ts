//! DELETE LATER ONLY FOR TESTING PURPOSE

import { ApiRoutes } from '@/enums/routes.enums';
import axiosInstance from '@/lib/axiosInstance';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await axiosInstance.post(ApiRoutes.Register, { name, email, password });

    return NextResponse.json({ status: 200, message: 'success' });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
