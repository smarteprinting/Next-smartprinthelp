import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import Product from '@/models/Product';
import mongoose from 'mongoose';

/**
 * POST /api/products/[id]/reviews
 * Add a review to a product
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { rating, comment } = body;

    if (!rating || !comment) {
      return errorResponse('Rating and comment are required', 400);
    }

    const product = await Product.findById(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const review = {
      user: authResult.user._id,
      name: authResult.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    product.reviews.push(review);

    // Calculate average rating
    const avgRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    product.rating = Number(avgRating.toFixed(1));

    await product.save();

    return successResponse(product, 'Review added successfully', 201);
  } catch (error) {
    console.error('Review POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/products/[id]/reviews
 * Update a review
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
    const { reviewId, rating, comment } = body;

    if (!reviewId || !rating || !comment) {
      return errorResponse(
        'Review ID, rating, and comment are required',
        400
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      return errorResponse('Review not found', 404);
    }

    // Check if user is the review owner or admin
    if (
      review.user.toString() !== authResult.user._id.toString() &&
      !authResult.user.isAdmin
    ) {
      return errorResponse('Not authorized to update this review', 403);
    }

    review.rating = Number(rating);
    review.comment = comment;

    // Recalculate average rating
    const avgRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    product.rating = Number(avgRating.toFixed(1));

    await product.save();

    return successResponse(product, 'Review updated successfully', 200);
  } catch (error) {
    console.error('Review PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * DELETE /api/products/[id]/reviews
 * Delete a review
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { reviewId } = body;

    if (!reviewId) {
      return errorResponse('Review ID is required', 400);
    }

    const product = await Product.findById(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      return errorResponse('Review not found', 404);
    }

    // Check if user is the review owner or admin
    if (
      review.user.toString() !== authResult.user._id.toString() &&
      !authResult.user.isAdmin
    ) {
      return errorResponse('Not authorized to delete this review', 403);
    }

    product.reviews.pull(reviewId);

    // Recalculate average rating if there are still reviews
    if (product.reviews.length > 0) {
      const avgRating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      product.rating = Number(avgRating.toFixed(1));
    } else {
      product.rating = 0;
    }

    await product.save();

    return successResponse(product, 'Review deleted successfully', 200);
  } catch (error) {
    console.error('Review DELETE error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
