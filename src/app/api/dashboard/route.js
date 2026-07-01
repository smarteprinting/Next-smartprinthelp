import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

/**
 * GET /api/dashboard
 * Get dashboard statistics and analytics (admin only)
 * Returns: revenue, orders, customers, recent orders, order status breakdown, revenue by month
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
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // === REVENUE CALCULATIONS ===
    // Total Revenue (all paid orders, excluding cancelled)
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Current Month Revenue
    const currentMonthRevenue = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' }, createdAt: { $gte: currentMonthStart } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const currentRevenue = currentMonthRevenue.length > 0 ? currentMonthRevenue[0].total : 0;

    // Last Month Revenue
    const lastMonthRevenue = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' }, createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const lastRevenue = lastMonthRevenue.length > 0 ? lastMonthRevenue[0].total : 0;

    // Revenue Growth Percentage
    const revenueGrowth = lastRevenue > 0
      ? (((currentRevenue - lastRevenue) / lastRevenue) * 100).toFixed(1)
      : currentRevenue > 0 ? 100 : 0;

    // === ORDERS CALCULATIONS ===
    // Total Orders
    const totalOrders = await Order.countDocuments();
    const currentMonthOrders = await Order.countDocuments({ createdAt: { $gte: currentMonthStart } });
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    // Orders Growth Percentage
    const ordersGrowth = lastMonthOrders > 0
      ? (((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100).toFixed(1)
      : currentMonthOrders > 0 ? 100 : 0;

    // === CUSTOMERS CALCULATIONS ===
    // Total Customers (non-admin users)
    const totalCustomers = await User.countDocuments({ isAdmin: false });
    const currentMonthCustomers = await User.countDocuments({
      isAdmin: false,
      createdAt: { $gte: currentMonthStart }
    });
    const lastMonthCustomers = await User.countDocuments({
      isAdmin: false,
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    // Customers Growth Percentage
    const customersGrowth = lastMonthCustomers > 0
      ? (((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100).toFixed(1)
      : currentMonthCustomers > 0 ? 100 : 0;

    // === PRODUCTS CALCULATIONS ===
    const totalProducts = await Product.countDocuments();
    const activeStock = await Product.countDocuments({ countInStock: { $gt: 0 } });

    // === RECENT ORDERS ===
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('_id user totalPrice status isPaid createdAt');

    // === ORDERS BY STATUS ===
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // === REVENUE BY MONTH (LAST 6 MONTHS) ===
    const revenueByMonth = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' }, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // === TOP SELLING PRODUCTS ===
    const topProducts = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'Cancelled' } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          totalQty: { $sum: '$orderItems.qty' },
          totalRevenue: { $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] } }
        }
      },
      { $sort: { totalQty: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } }
    ]);

    const dashboardData = {
      revenue: {
        total: Number(totalRevenue.toFixed(2)),
        currentMonth: Number(currentRevenue.toFixed(2)),
        lastMonth: Number(lastRevenue.toFixed(2)),
        growth: Number(revenueGrowth)
      },
      orders: {
        total: totalOrders,
        currentMonth: currentMonthOrders,
        lastMonth: lastMonthOrders,
        growth: Number(ordersGrowth)
      },
      customers: {
        total: totalCustomers,
        currentMonth: currentMonthCustomers,
        lastMonth: lastMonthCustomers,
        growth: Number(customersGrowth)
      },
      products: {
        total: totalProducts,
        activeStock
      },
      recentOrders,
      ordersByStatus,
      revenueByMonth,
      topProducts: topProducts.map(item => ({
        productId: item._id,
        productName: item.product[0]?.title || 'Unknown',
        totalQty: item.totalQty,
        totalRevenue: Number(item.totalRevenue.toFixed(2))
      }))
    };

    return successResponse(dashboardData, 'Dashboard statistics retrieved', 200);
  } catch (error) {
    console.error('Dashboard GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
