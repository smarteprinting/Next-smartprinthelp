import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';

/**
 * GET /api/orders
 * Get all orders (admin) or user's orders (user)
 */
export async function GET(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { searchParams } = new URL(request.url);
    const isAdmin = authResult.user.isAdmin;

    if (isAdmin) {
      // Admin - get all orders
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 20;
      const search = searchParams.get('search') || '';

      let query = {};

      if (search) {
        query.$or = [
          { _id: { $regex: search, $options: 'i' } },
          { 'shippingAddress.address': { $regex: search, $options: 'i' } },
          { 'shippingAddress.city': { $regex: search, $options: 'i' } },
        ];
      }

      const count = await Order.countDocuments(query);
      const orders = await Order.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      return successResponse(
        { orders, page, pages: Math.ceil(count / limit), total: count },
        'Orders retrieved',
        200
      );
    } else {
      // User - get their orders only
      const orders = await Order.find({ user: authResult.user._id });
      return successResponse(orders, 'Orders retrieved', 200);
    }
  } catch (error) {
    console.error('Orders GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const body = await request.json();
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return errorResponse('No order items', 400);
    }

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        name: x.title || x.name,
        qty: x.qty,
        image: x.image,
        price: x.price,
        product: x.product,
      })),
      user: authResult.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return successResponse(createdOrder, 'Order created successfully', 201);
  } catch (error) {
    console.error('Orders POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
