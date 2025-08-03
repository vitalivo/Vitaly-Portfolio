import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  console.log('🔍 MIDDLEWARE WORKS:', request.nextUrl.pathname);
  console.log('🔍 MIDDLEWARE URL:', request.url);
  
  if (request.nextUrl.pathname.startsWith('/en/')) {
    console.log('✅ Processing EN route');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/(en|ru|he)/:path*'
  ]
};