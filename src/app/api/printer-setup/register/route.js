import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PrinterRegistration from '@/models/PrinterRegistration';
import { sendEmail } from '@/lib/emailService';
import { checkDistributedRateLimit, RATE_LIMITS } from '@/lib/securityRateLimit';
import { escapeHtml, getClientIp, isValidEmail, logSecurity } from '@/lib/security';
import { createSecurityFingerprint } from '@/lib/securityFingerprint';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { model, name, phone, email, agree, website } = body;

    if (website) {
      logSecurity(request, 'BLOCK', 'HONEYPOT');
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (!model || !name || !phone || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Name, phone number, and email are required.' }, { status: 400 });
    }

    if ([model, name, phone, email].some(value => String(value).length > 200)) {
      return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
    }

    const rateLimit = await checkDistributedRateLimit({
      identifier: createSecurityFingerprint([getClientIp(request), email, model]),
      scope: 'submission-registration',
      ...RATE_LIMITS.submission,
    });
    if (!rateLimit.allowed) {
      logSecurity(request, 'BLOCK', 'SUBMISSION_RATE_LIMIT');
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    // Save to DB
    const reg = new PrinterRegistration({ model, name, phone, email, agree });
    await reg.save();

    // Send notification to contact@smartprinthelp.com (ss2)
    const htmlContent = `
      <h2>New Printer Setup Registration</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Printer Model:</strong> ${escapeHtml(model)}</p>
      <p><strong>Agreed to terms:</strong> ${agree ? 'Yes' : 'No'}</p>
      <p><em>Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</em></p>
    `;

    try {
      await sendEmail({
        to: [
          process.env.CONTACT_RECEIVER_EMAIL || 'support@smartprinthelp.com',
          'contact@smartprinthelp.com',
        ],
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
