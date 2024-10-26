// src/app/api/watchlist/route.ts

import { NextResponse } from 'next/server';

let watchlist: { id: number; title: string; poster_path: string; vote_average: number; release_date: string; }[] = [];

export async function GET() {
  return NextResponse.json(watchlist);
}

export async function POST(request: Request) {
  const movie = await request.json();
  watchlist.push(movie);
  return NextResponse.json({ message: 'Added to watchlist' }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  watchlist = watchlist.filter(movie => movie.id !== id);
  return NextResponse.json({ message: 'Removed from watchlist' });
}
