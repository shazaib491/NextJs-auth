import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Define the paths that require authentication
  const protectedPaths = [
    '/protected',
    '/home',
    '/about',
    '/services',
    '/price',
    '/contact'
  ];

  // Check if the request path is protected
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // If the path is not protected, continue the request
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Retrieve the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);

  // If token exists, continue the request
  if (token) {
    return NextResponse.next();
  }

  // If token does not exist, redirect to login
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/protected/:path*',
    '/home/:path*',
    '/about/:path*',
    '/services/:path*',
    '/price/:path*',
    '/contact/:path*'
  ],
};
