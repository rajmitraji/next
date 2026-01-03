import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

export async function GET(request) {
  try {
    // Step 1: Connect to DB
    await connect();

    // Step 2: Extract userID from token using helper
    const userID = await getDataFromToken(request);
    if (!userID) {
      return NextResponse.json(
        { message: 'Unauthorized: No valid token found' },
        { status: 401 }
      );
    }

    // Step 3: Fetch user from DB (excluding sensitive fields)
    const user = await User.findById(userID).select(
      '-password -__v -forgotPasswordToken -forgotPasswordExpiry -verifyToken -verifyTokenExpiry'
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Step 4: Return success response
    return NextResponse.json({
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('🔥 /api/users/me error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
