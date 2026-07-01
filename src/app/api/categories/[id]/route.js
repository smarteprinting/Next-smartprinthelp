import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Category from '@/models/Category';

/**
 * GET /api/categories/[id]
 * Fetch a single category
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const category = await Category.findById(id);

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    return successResponse(category, 'Category retrieved', 200);
  } catch (error) {
    console.error('Category GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/categories/[id]
 * Update a category (admin only)
 */
export async function PUT(request, { params }) {
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
    const body = await request.json();
    const { name, slug, image, description } = body;

    const category = await Category.findById(id);

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.image = image || category.image;
    category.description = description || category.description;

    const updatedCategory = await category.save();

    return successResponse(
      updatedCategory,
      'Category updated successfully',
      200
    );
  } catch (error) {
    console.error('Category PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * DELETE /api/categories/[id]
 * Delete a category (admin only)
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
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    return successResponse(
      { message: 'Category deleted successfully' },
      'Category deleted',
      200
    );
  } catch (error) {
    console.error('Category DELETE error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
