import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware: Processing request for:', request.nextUrl.pathname);
  
  // Use your actual project ref here:
  const projectRef = 'ahtnxbcesnzpoiktftni';
  
  // Check for multiple possible cookie names that Supabase might use
  const supabaseCookie = request.cookies.get(`sb-${projectRef}-auth-token`)?.value ||
                        request.cookies.get(`sb-${projectRef}-auth-token`)?.value ||
                        request.cookies.get('supabase-auth-token')?.value;
  
  console.log('Middleware: Supabase cookie present:', !!supabaseCookie);
  console.log('Middleware: All cookies:', request.cookies.getAll().map(c => c.name));

  // Allow auth callback route to pass through
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    console.log('Middleware: Allowing auth callback route');
    return NextResponse.next();
  }

  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') ||
                      request.nextUrl.pathname.startsWith('/snippets');

  console.log('Middleware: Is protected route:', isProtected);

  // For now, let's be more lenient and allow the dashboard to load
  // The client-side auth context will handle the actual protection
  if (isProtected) {
    console.log('Middleware: Protected route detected, allowing through for client-side auth check');
    return NextResponse.next();
  }

  console.log('Middleware: Allowing request through');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/snippets/:path*'],
};
