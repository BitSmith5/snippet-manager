import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const projectRef = 'ahtnxbcesnzpoiktftni';
  
  const supabaseCookie = request.cookies.get(`sb-${projectRef}-auth-token`)?.value ||
                        request.cookies.get(`sb-${projectRef}-auth-token`)?.value ||
                        request.cookies.get('supabase-auth-token')?.value;

  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.next();
  }

  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') ||
                      request.nextUrl.pathname.startsWith('/snippets');

  if (isProtected) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/snippets/:path*'],
};
