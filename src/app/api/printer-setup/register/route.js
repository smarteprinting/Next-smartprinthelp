import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PrinterRegistration from '@/models/PrinterRegistration';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { model, name, phone, email, agree } = body;

    // model and name are required; phone and email optional (form is bypassed)
    if (!model || !name) {
      return NextResponse.json({ error: 'Model and name are required.' }, { status: 400 });
    }

    // Save to DB
    const reg = new PrinterRegistration({ model, name, phone, email, agree });
    await reg.save();

    // Send notification to contact@smartprinthelp.com (ss2)
    const htmlContent = `
      <h2>New Printer Setup Registration</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Printer Model:</strong> ${model}</p>
      <p><strong>Agreed to terms:</strong> ${agree ? 'Yes' : 'No'}</p>
      <p><em>Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</em></p>
    `;

    try {
      await sendEmail({
        to: 'contact@smartprinthelp.com',
        subject: 'New Printer Setup Registration',
        html: htmlContent,
        replyTo: email || 'no-reply@smartprinthelp.com'
      });
      console.log('✅ Printer registration email sent to contact@smartprinthelp.com');
    } catch (emailErr) {
      console.error('❌ Failed to send registration notification:', emailErr.message);
      // Still return success — registration is saved to DB regardless
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register and send email.' }, { status: 500 });
  }
}
