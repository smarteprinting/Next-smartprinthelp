import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import Product from '@/models/Product';

/**
 * GET /api/products/search
 * Get search suggestions for products
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return successResponse([], 'Search suggestions', 200);
    }

    const suggestions = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { shortDetails: { $regex: query, $options: 'i' } },
      ],
    })
      .select('title brand')
      .limit(10);

    const uniqueSuggestions = [
      ...new Set(
        suggestions
          .map((p) => p.title)
          .concat(suggestions.map((p) => p.brand).filter(Boolean))
      ),
    ].slice(0, 10);

    return successResponse(
      uniqueSuggestions,
      'Search suggestions retrieved',
      200
    );
  } catch (error) {
    console.error('Search error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
