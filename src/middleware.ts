import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get('sb-access-token');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
