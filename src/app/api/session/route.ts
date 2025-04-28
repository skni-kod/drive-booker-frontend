import { getSession } from '@/actions/getSession';

export async function GET() {
  const session = await getSession();
  return new Response(JSON.stringify(session), { status: 200 });
}
