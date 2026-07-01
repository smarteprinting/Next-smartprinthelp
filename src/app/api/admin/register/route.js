import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import PrinterRegistration from '@/models/PrinterRegistration';

/**
 * POST /api/admin/register
 * Register printer setup (public)
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, model, agree } = body;

    if (!name || !email || !phone || !model) {
      return errorResponse('All fields are required', 400);
    }

    if (!agree) {
      return errorResponse('You must agree to the terms and conditions', 400);
    }

    const registration = await PrinterRegistration.create({
      name,
      email,
      phone,
      model,
      agree,
    });

    if (!registration) {
      return errorResponse('Invalid registration data', 400);
    }

    return successResponse(
      {
        success: true,
        message: 'Registration successful',
        data: registration,
      },
      'Printer registered',
      201
    );
  } catch (error) {
    console.error('Admin register error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
