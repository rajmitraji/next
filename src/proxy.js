import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request) {
  const url = new URL(request.url);
  const path = url.pathname;
    const isPublicPath = ['/login', '/signup'].includes(path);
    const token = request.cookies.get('token')?.value;
    if(isPublicPath && token){
        const profileUrl = new URL('/', request.url);
        return NextResponse.redirect(profileUrl);
    }
    if (!isPublicPath && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }
    // return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
  '/',
    '/profile',
    '/login',
    '/signup',
    // '/api/users/logout'
  ]
};
