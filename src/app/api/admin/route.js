import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import PrinterRegistration from '@/models/PrinterRegistration';

/**
 * POST /api/admin
 * Register printer (public)
 * body.action: 'register-printer'
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { action } = body;

    // REGISTER PRINTER - public
    if (action === 'register-printer') {
      const { name, email, phone, model, agree } = body;

      if (!name || !email || !phone || !model) {
        return errorResponse('All fields are required', 400);
      }

      if (!agree) {
        return errorResponse(
          'You must agree to the terms and conditions',
          400
        );
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
    }

    return errorResponse('Invalid action', 400);
  } catch (error) {
    console.error('Admin POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
