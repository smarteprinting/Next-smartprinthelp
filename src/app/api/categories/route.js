import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Category from '@/models/Category';
import Product from '@/models/Product';

/**
 * GET /api/categories
 * Fetch all categories with product counts
 */
export async function GET(request) {
  try {
    await connectDB();

    const categories = await Category.find({});

    // Enrich with product counts
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return {
          ...cat.toObject(),
          count,
        };
      })
    );

    return successResponse(
      categoriesWithCounts,
      'Categories retrieved',
      200
    );
  } catch (error) {
    console.error('Categories GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * POST /api/categories
 * Create a new category (admin only)
 */
export async function POST(request) {
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

    const body = await request.json();
    const { name, slug, image, description } = body;

    if (!name) {
      return errorResponse('Category name is required', 400);
    }

    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-');

    const category = new Category({
      name,
      slug: generatedSlug,
      image: image || '',
      description: description || '',
    });

    const createdCategory = await category.save();

    return successResponse(
      createdCategory,
      'Category created successfully',
      201
    );
  } catch (error) {
    console.error('Categories POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
