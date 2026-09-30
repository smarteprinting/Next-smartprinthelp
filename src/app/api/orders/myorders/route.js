import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';

/**
 * GET /api/orders/myorders
 * Get logged-in user's orders
 */
export async function GET(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const orders = await Order.find({ user: authResult.user._id }).sort({ createdAt: -1 });

    return successResponse(orders, 'Orders retrieved', 200);
  } catch (error) {
    console.error('My orders GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
