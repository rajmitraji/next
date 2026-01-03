import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create response object
    const response = NextResponse.json({ message: 'Logout successful',success:true});

    // Invalidate the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/', // ensure cookie path matches login
      maxAge: 0, // expire immediately
    });

    return response;
    
  } catch (error) {
    console.error('🔥 /api/users/logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
