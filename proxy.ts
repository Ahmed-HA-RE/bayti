import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export const proxy = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const token = request.nextUrl.searchParams.get('token');

  if (session && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session && request.nextUrl.pathname.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session && request.nextUrl.pathname.startsWith('/forgot-password')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith('/reset-password')) {
    return NextResponse.redirect(new URL('/forgot-password', request.url));
  }
};

export const config = {
  matcher: ['/login', '/sign-up', '/forgot-password', '/reset-password'],
};
