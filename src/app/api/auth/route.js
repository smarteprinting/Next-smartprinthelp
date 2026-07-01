import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { generateToken, verifyToken } from '@/lib/jwt';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { generateOTP, sendOTPEmail } from '@/lib/emailService';
import bcrypt from 'bcryptjs';

// POST handler moved to [action]/route.js
/**
 * GET /api/auth
 * Get current user profile (requires auth)
 */
export async function GET(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const user = authResult.user;

    return successResponse(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'Profile retrieved',
      200
    );
  } catch (error) {
    console.error('Auth GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/auth
 * Update user profile (requires auth)
 */
export async function PUT(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const user = authResult.user;
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    const updatedUser = await User.findById(user._id);

    if (!updatedUser) {
      return errorResponse('User not found', 404);
    }

    updatedUser.firstName = firstName || updatedUser.firstName;
    updatedUser.lastName = lastName || updatedUser.lastName;
    updatedUser.name = `${updatedUser.firstName} ${updatedUser.lastName}`;
    updatedUser.email = email || updatedUser.email;

    if (password) {
      updatedUser.password = password;
    }

    await updatedUser.save();

    return successResponse(
      {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      },
      'Profile updated successfully',
      200
    );
  } catch (error) {
    console.error('Auth PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
