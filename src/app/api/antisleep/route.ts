import { NextResponse } from 'next/server';
import { api } from '~/trpc/server';

export async function GET() {
  await api.posts.antisleep.mutate();
  return NextResponse.json(
    { body: "Successfully completed antisleep routine!" },
    { status: 200 }
  );
}