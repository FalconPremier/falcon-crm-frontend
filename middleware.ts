import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = sessionCookie?.value === 'true';
  const onboardedCookie = request.cookies.get('onboarded');
  const isOnboarded = onboardedCookie?.value === 'true';

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!pathname.startsWith('/onboarding') && onboardedCookie && !isOnboarded) {
    //Redirect to setPassword
    const setPasswordUrl = new URL('/onboarding', request.url);
    return NextResponse.redirect(setPasswordUrl);
  }
  if (isPublicPath && isAuthenticated) {
    // Redirect authenticated users away from public pages to dashboard
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (!isPublicPath && !isAuthenticated) {
    // Redirect unauthenticated users trying to access protected pages
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
