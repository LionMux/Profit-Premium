import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/';
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isDashboardRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/materials') ||
    nextUrl.pathname.startsWith('/profile') ||
    nextUrl.pathname.startsWith('/contacts') ||
    nextUrl.pathname.startsWith('/admin');

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login for dashboard routes
  if (!isLoggedIn && isDashboardRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // Redirect authenticated users to dashboard when accessing login
  if (isLoggedIn && nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
