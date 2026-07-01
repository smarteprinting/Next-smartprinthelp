import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { errorResponse } from '@/lib/response';

/**
 * Protect middleware - Verifies JWT token and attaches user to request
 */
export async function protectMiddleware(request) {
  try {
    // Get token from headers
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        error: true,
        message: 'Not authorized, no token',
        status: 401,
      };
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        error: true,
        message: 'Not authorized, token failed',
        status: 401,
      };
    }

    // Connect to database
    await connectDB();

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return {
        error: true,
        message: 'User not found',
        status: 404,
      };
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return {
        error: true,
        message: 'Your account has been blocked by admin',
        status: 403,
      };
    }

    return {
      error: false,
      user,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Authentication failed',
      status: 500,
    };
  }
}

/**
 * Admin middleware - Verifies user is admin
 */
export function adminMiddleware(user) {
  if (!user || !user.isAdmin) {
    return {
      error: true,
      message: 'Not authorized as an admin',
      status: 403,
    };
  }

  return {
    error: false,
  };
}

/**
 * Setup Admin Auth - For setup routes
 */
export async function setupAdminAuthMiddleware(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        error: true,
        message: 'Not authorized, no token',
        status: 401,
      };
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return {
        error: true,
        message: 'Invalid token',
        status: 401,
      };
    }

    // For setup admin, we check if the decoded token has admin flag
    // or if the user exists and is admin
    await connectDB();
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isAdmin) {
      return {
        error: true,
        message: 'Not authorized as an admin',
        status: 403,
      };
    }

    return {
      error: false,
      user,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Authentication failed',
      status: 500,
    };
  }
}
