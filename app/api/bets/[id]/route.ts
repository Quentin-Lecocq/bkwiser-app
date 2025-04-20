import { NextResponse } from 'next/server';

export async function GET() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts/2');
  const json = await data.json();

  console.log({ json });
  return NextResponse.json(json);
}
