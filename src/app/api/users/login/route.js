import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connect();

    const reqBody = await request.json();
    let { email, password } = reqBody;

    /* ===============================
       1️⃣ BASIC INPUT VALIDATION
    =============================== */
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    /* ===============================
       2️⃣ NORMALIZE EMAIL
    =============================== */
    email = email.toLowerCase().trim();

    /* ===============================
       3️⃣ CHECK USER EXISTS
    =============================== */
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    /* ===============================
       4️⃣ PASSWORD MATCH
    =============================== */
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 400 }
      );
    }

    /* ===============================
       5️⃣ TOKEN PAYLOAD
    =============================== */
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    /* ===============================
       6️⃣ CREATE JWT
    =============================== */
    if (!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET not defined');
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    /* ===============================
       7️⃣ RESPONSE + COOKIE
    =============================== */
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('🔥 Login Error:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
