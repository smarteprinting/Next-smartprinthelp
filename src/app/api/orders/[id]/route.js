import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';

/**
 * GET /api/orders/[id]
 * Get a single order
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const order = await Order.findById(id).populate('user', 'name email');

    if (!order) {
      return errorResponse('Order not found', 404);
    }

    // Check authorization
    if (
      order.user._id.toString() !== authResult.user._id.toString() &&
      !authResult.user.isAdmin
    ) {
      return errorResponse(
        'Not authorized to access this order',
        403
      );
    }

    return successResponse(order, 'Order retrieved', 200);
  } catch (error) {
    console.error('Order GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/orders/[id]
 * Update order status or mark as paid
 * body.action: 'pay' or 'status'
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    const order = await Order.findById(id);

    if (!order) {
      return errorResponse('Order not found', 404);
    }

    // MARK AS PAID
    if (action === 'pay') {
      // Anyone can update their own order
      if (
        order.user.toString() !== authResult.user._id.toString() &&
        !authResult.user.isAdmin
      ) {
        return errorResponse(
          'Not authorized to update this order',
          403
        );
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: body.id || '',
        status: body.status || 'completed',
        update_time: body.update_time || new Date(),
        email_address: body.email_address || '',
      };

      const updatedOrder = await order.save();
      return successResponse(updatedOrder, 'Order marked as paid', 200);
    }

    // UPDATE STATUS - admin only
    if (action === 'status') {
      const adminCheck = adminMiddleware(authResult.user);
      if (adminCheck.error) {
        return errorResponse(adminCheck.message, adminCheck.status);
      }

      order.status = body.status || order.status;
      order.tracking = {
        currentLocation:
          body.currentLocation || order.tracking?.currentLocation || '',
        estTime: body.estTime || order.tracking?.estTime || '',
      };

      if (order.status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = new Date();
      }

      const updatedOrder = await order.save();
      return successResponse(updatedOrder, 'Order status updated', 200);
    }

    return errorResponse('Invalid action', 400);
  } catch (error) {
    console.error('Order PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * DELETE /api/orders/[id]
 * Delete an order (admin only)
 */
export async function DELETE(request, { params }) {
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

    const { id } = await params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return errorResponse('Order not found', 404);
    }

    return successResponse(
      { message: 'Order deleted successfully' },
      'Order deleted',
      200
    );
  } catch (error) {
    console.error('Order DELETE error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
