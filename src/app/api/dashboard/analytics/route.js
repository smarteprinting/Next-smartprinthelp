import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';
import Product from '@/models/Product';

/**
 * GET /api/dashboard/analytics
 * Get analytics data for dashboard (admin only)
 * Returns: revenue, orders, customers stats with growth metrics
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

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // === REVENUE ===
    const totalRevenueResult = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const lastMonthRevenueResult = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          status: { $ne: 'Cancelled' },
          createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const lastMonthRevenue = lastMonthRevenueResult.length > 0 ? lastMonthRevenueResult[0].total : 0;

    const currentMonthRevenueResult = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          status: { $ne: 'Cancelled' },
          createdAt: { $gte: currentMonthStart }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const currentMonthRevenue = currentMonthRevenueResult.length > 0 ? currentMonthRevenueResult[0].total : 0;

    const revenueGrowth = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : 0;

    // === ORDERS ===
    const totalOrdersResult = await Order.countDocuments({ isPaid: true });
    const lastMonthOrdersResult = await Order.countDocuments({
      isPaid: true,
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });
    const currentMonthOrdersResult = await Order.countDocuments({
      isPaid: true,
      createdAt: { $gte: currentMonthStart }
    });

    const ordersGrowth = lastMonthOrdersResult > 0 ? ((currentMonthOrdersResult - lastMonthOrdersResult) / lastMonthOrdersResult * 100).toFixed(1) : 0;

    // === CUSTOMERS ===
    const totalCustomersResult = await Order.aggregate([
      { $group: { _id: '$user' } },
      { $count: 'total' }
    ]);
    const totalCustomers = totalCustomersResult.length > 0 ? totalCustomersResult[0].total : 0;

    const lastMonthCustomersResult = await Order.aggregate([
      { $match: { createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      { $group: { _id: '$user' } },
      { $count: 'total' }
    ]);
    const lastMonthCustomers = lastMonthCustomersResult.length > 0 ? lastMonthCustomersResult[0].total : 0;

    const currentMonthCustomersResult = await Order.aggregate([
      { $match: { createdAt: { $gte: currentMonthStart } } },
      { $group: { _id: '$user' } },
      { $count: 'total' }
    ]);
    const currentMonthCustomers = currentMonthCustomersResult.length > 0 ? currentMonthCustomersResult[0].total : 0;

    const customersGrowth = lastMonthCustomers > 0 ? ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers * 100).toFixed(1) : 0;

    // === ACTIVE STOCK ===
    const activeStock = await Product.countDocuments({ countInStock: { $gt: 0 } });

    // === RECENT ORDERS ===
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return successResponse({
      revenue: {
        total: totalRevenue,
        growth: parseFloat(revenueGrowth)
      },
      orders: {
        total: totalOrdersResult,
        growth: parseFloat(ordersGrowth)
      },
      customers: {
        total: totalCustomers,
        growth: parseFloat(customersGrowth)
      },
      activeStock,
      recentOrders
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return errorResponse(error.message || 'Failed to fetch analytics', 500);
  }
}
