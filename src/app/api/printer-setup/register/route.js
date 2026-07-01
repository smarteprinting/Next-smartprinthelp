import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PrinterRegistration from '@/models/PrinterRegistration';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { model, name, phone, email, agree } = body;

    if (!model || !name || !phone || !email) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Save to DB
    const reg = new PrinterRegistration({ model, name, phone, email, agree });
    await reg.save();

    // Send email
    const htmlContent = `
      <h2>New Printer Registration</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Model:</strong> ${model}</p>
      <p><strong>Agreed to terms:</strong> ${agree ? 'Yes' : 'No'}</p>
    `;

    await sendEmail({
      to: 'support@smartprinthelp.com', // Registration goes to support email
      subject: 'New Printer Registration',
      html: htmlContent,
      replyTo: email
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register and send email.' }, { status: 500 });
  }
}
