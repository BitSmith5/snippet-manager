import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Use your actual project ref here:
  const projectRef = 'ahtnxbcesnzpoiktftni';
  const supabaseCookie = request.cookies.get(`sb-${projectRef}-auth-token`)?.value;

  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') ||
                      request.nextUrl.pathname.startsWith('/snippets');

  if (isProtected && !supabaseCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/snippets/:path*'],
};
