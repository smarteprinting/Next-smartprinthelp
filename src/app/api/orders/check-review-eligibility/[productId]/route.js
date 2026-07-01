import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';

/**
 * GET /api/orders/check-review-eligibility/[productId]
 * Check if a logged-in user is eligible to review a product.
 * A user is eligible if they have purchased and received that product.
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return successResponse({ canReview: false }, 'Not authenticated', 200);
    }

    const { productId } = await params;

    // Look for a delivered order belonging to this user containing the product
    const eligibleOrder = await Order.findOne({
      user: authResult.user._id,
      isDelivered: true,
      'orderItems.product': productId,
    });

    if (eligibleOrder) {
      return successResponse({ canReview: true }, 'User is eligible to review', 200);
    }

    // Also allow review if order is paid (not just delivered) - more lenient policy
    const paidOrder = await Order.findOne({
      user: authResult.user._id,
      isPaid: true,
      'orderItems.product': productId,
    });

    return successResponse(
      { canReview: !!paidOrder },
      paidOrder ? 'User is eligible to review' : 'User has not purchased this product',
      200
    );
  } catch (error) {
    console.error('Check review eligibility error:', error);
    return successResponse({ canReview: false }, 'Error checking eligibility', 200);
  }
}
