import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/myshop/:path*',
    '/myprofile/:path*',
    '/editmyshop/:path*',
    '/editnotice/:path*',
    '/shop/:path*',
    '/assignmyshop',
    '/assignnotice',
    '/signin',
    '/signup',
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieToken = req.cookies.get('token');
  const cookieType = req.cookies.get('myType');
  const cookieShopId = req.cookies.get('shopId');
  const cookieUserId = req.cookies.get('userId');

  let token;
  let type;
  if (cookieToken) {
    token = cookieToken.value;
  }
  if (cookieType) {
    type = cookieType.value;
  }

  // '/myshop' 또는 '/myshop/[shopId]' 경로 처리
  if (pathname.startsWith('/myshop')) {
    const shopIdFromPath = pathname.split('/')[2] || null;
    const cookieShopIdValue = cookieShopId?.value;

    // '/myshop'로 접근한 경우
    if (!shopIdFromPath && cookieShopIdValue) {
      return NextResponse.redirect(new URL(`/myshop/${cookieShopIdValue}`, req.url));
    }

    // '/myshop/[shopId]'로 접근한 경우
    if (shopIdFromPath && cookieShopIdValue && shopIdFromPath !== cookieShopIdValue) {
      return NextResponse.redirect(new URL(`/myshop/${cookieShopIdValue}`, req.url));
    }
  }

  const userIdIdFromPath = pathname.startsWith('/myprofile') ? pathname.split('/')[2] : null;

  if (pathname.startsWith('/myprofile') && cookieUserId) {
    const cookieUserIdValue = cookieUserId.value;
    if (userIdIdFromPath !== cookieUserIdValue) {
      return NextResponse.redirect(new URL(`/myprofile/${cookieUserIdValue}`, req.url));
    }
  }

  if (type !== 'employer') {
    if (pathname.startsWith('/assignmyshop')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.startsWith('/assignnotice')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.startsWith('/editmyshop')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (pathname.startsWith('/editnotice')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 로그인된 유저만 접근 O (내 가게, 내 프로필)
  if (pathname.startsWith('/myshop') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  if (pathname.startsWith('/myprofile') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // 로그인된 유저는 로그인, 회원가입 페이지에 접근 X
  if (pathname.startsWith('/signin') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (pathname.startsWith('/signup') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
