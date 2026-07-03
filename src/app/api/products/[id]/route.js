import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { uploadToCloudinary } from '@/lib/cloudinary';
import mongoose from 'mongoose';

// Same normalization as in POST: convert <p> blocks to <br/> sequences before saving updates
const normalizeOverviewForSaving = (html) => {
  if (!html || typeof html !== 'string') return html;
  let out = html;
  out = out.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
  out = out.replace(/&nbsp;/gi, ' ');
  out = out.replace(/<p[^>]*>\s*<\/p>/gi, '');
  out = out.replace(/<\/p>\s*<p[^>]*>/gi, '<br/><br/>');
  out = out.replace(/<p[^>]*>/gi, '');
  out = out.replace(/<\/p>/gi, '<br/><br/>');
  out = out.replace(/(?:<br\/?>(\s|\n|\r)*){3,}/gi, '<br/><br/>');
  out = out.replace(/^(?:\s|<br\/?>)+/i, '').replace(/(?:\s|<br\/?>)+$/i, '');
  return out;
}

/**
 * GET /api/products/[id]
 * Fetch single product by ID or slug
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let product;

    // Try to find by ID first
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).populate('category', 'name');
    }

    // If not found by ID, try by slug
    if (!product) {
      product = await Product.findOne({ slug: id }).populate(
        'category',
        'name'
      );
    }

    // Fallback: try fuzzy match by title
    if (!product) {
      const titlePattern = id.replace(/-/g, ' ');
      product = await Product.findOne({
        title: { $regex: new RegExp(`^${titlePattern}$`, 'i') },
      }).populate('category', 'name');
    }

    // Last resort: partial match
    if (!product) {
      const parts = id.split('-');
      const firstFewParts = parts
        .slice(0, Math.min(parts.length, 3))
        .join(' ');
      if (firstFewParts.length > 5) {
        product = await Product.findOne({
          title: { $regex: new RegExp(firstFewParts, 'i') },
        }).populate('category', 'name');
      }
    }

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(product, 'Product retrieved', 200);
  } catch (error) {
    console.error('Product GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/products/[id]
 * Update a product (admin only)
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
    
    // Parse FormData
    const formData = await request.formData();
    
    // Convert FormData to object
    const body = {};
    const files = [];
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.name) {
        files.push(value);
      } else if (key !== 'images' || !(value instanceof File)) {
        body[key] = value;
      }
    }

    const product = await Product.findById(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    // Helper to parse array fields
    const parseArrayField = (field) => {
      if (!field) return [];
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch {
          return field.split(',').map(v => v.trim()).filter(Boolean);
        }
      }
      return field;
    };

    // sanitize overview if present
    if (body.overview) body.overview = normalizeOverviewForSaving(body.overview);

    // Update fields
    Object.keys(body).forEach((key) => {
      if (key !== '_id' && key !== 'images' && key !== 'existingImages') {
        if (['technology', 'usageCategory', 'allInOneType', 'mainFunction', 'reviews'].includes(key)) {
          product[key] = parseArrayField(body[key]);
        } else {
          product[key] = body[key];
        }
      }
    });
    
    // Handle Images
    let currentImages = [];
    if (body.existingImages) {
        currentImages = typeof body.existingImages === 'string' ? JSON.parse(body.existingImages) : body.existingImages;
    } else {
        currentImages = product.images || [];
    }

    if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return uploadToCloudinary(buffer, file.name);
        });
        const newImageUrls = await Promise.all(uploadPromises);
        product.images = [...currentImages, ...newImageUrls];
    } else {
        product.images = currentImages;
    }

    const updatedProduct = await product.save();

    return successResponse(
      updatedProduct,
      'Product updated successfully',
      200
    );
  } catch (error) {
    console.error('Product PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * DELETE /api/products/[id]
 * Delete a product (admin only)
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
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(
      { message: 'Product deleted successfully' },
      'Product deleted',
      200
    );
  } catch (error) {
    console.error('Product DELETE error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
