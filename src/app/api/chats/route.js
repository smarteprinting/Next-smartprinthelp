import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Chat from '@/models/Chat';

/**
 * GET /api/chats
 * Get all chats (admin only)
 */
export async function GET(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    // Admin check
    const adminCheck = adminMiddleware(authResult.user);
    if (adminCheck.error) {
      return errorResponse(adminCheck.message, adminCheck.status);
    }

    const chats = await Chat.find()
      .populate('user', 'name email avatar')
      .sort({ updatedAt: -1 });

    return successResponse(chats, 'Chats retrieved', 200);
  } catch (error) {
    console.error('Chats GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
