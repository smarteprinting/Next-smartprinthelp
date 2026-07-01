import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import Cart from '@/models/Cart';

/**
 * GET /api/cart
 * Get user's cart items
 */
export async function GET(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const cart = await Cart.findOne({ user: authResult.user._id });

    return successResponse(
      cart ? cart.items : [],
      'Cart retrieved',
      200
    );
  } catch (error) {
    console.error('Cart GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/cart
 * Save/update user's cart
 */
export async function PUT(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return errorResponse(
        'Invalid cart data: items must be an array',
        400
      );
    }

    let cart = await Cart.findOne({ user: authResult.user._id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({
        user: authResult.user._id,
        items,
      });
    }

    return successResponse(cart.items, 'Cart updated successfully', 200);
  } catch (error) {
    console.error('Cart PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * DELETE /api/cart
 * Clear user's cart
 */
export async function DELETE(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    await Cart.findOneAndDelete({ user: authResult.user._id });

    return successResponse(
      { message: 'Cart cleared successfully' },
      'Cart cleared',
      200
    );
  } catch (error) {
    console.error('Cart DELETE error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
