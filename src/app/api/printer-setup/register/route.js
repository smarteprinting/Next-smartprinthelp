import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PrinterRegistration from '@/models/PrinterRegistration';
import { sendEmail } from '@/lib/emailService';
import { checkDistributedRateLimit, RATE_LIMITS } from '@/lib/securityRateLimit';
import { escapeHtml, getClientIp, isValidEmail, logSecurity, verifyRecaptchaToken } from '@/lib/security';
import { createSecurityFingerprint } from '@/lib/securityFingerprint';

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { model, name, phone, email, agree, website, recaptchaToken } = body;

    if (website) {
      logSecurity(request, 'BLOCK', 'HONEYPOT');
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (
      typeof model !== 'string' ||
      typeof name !== 'string' ||
      typeof phone !== 'string' ||
      typeof email !== 'string' ||
      agree !== true ||
      !model.trim() ||
      !name.trim() ||
      !phone.trim() ||
      !isValidEmail(email.trim())
    ) {
      return NextResponse.json({ error: 'Name, phone number, and email are required.' }, { status: 400 });
    }

    if ([model, name, phone, email].some(value => value.trim().length > 200)) {
      return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
    }

    if (!(await verifyRecaptchaToken(recaptchaToken, 'model_page_registration'))) {
      logSecurity(request, 'BLOCK', 'RECAPTCHA');
      return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 403 });
    }

    await connectDB();

    const normalizedModel = model.trim();
    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const rateLimit = await checkDistributedRateLimit({
      identifier: createSecurityFingerprint([getClientIp(request), normalizedEmail, normalizedModel]),
      scope: 'submission-registration',
      ...RATE_LIMITS.submission,
    });
    if (!rateLimit.allowed) {
      logSecurity(request, 'BLOCK', 'SUBMISSION_RATE_LIMIT');
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    // Save to DB
    const reg = new PrinterRegistration({
      model: normalizedModel,
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      agree,
    });
    await reg.save();

    // Send notification to contact@smartprinthelp.com (ss2)
    const htmlContent = `
      <h2>New Printer Setup Registration</h2>
      <p><strong>Name:</strong> ${escapeHtml(normalizedName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(normalizedPhone)}</p>
      <p><strong>Printer Model:</strong> ${escapeHtml(normalizedModel)}</p>
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
        replyTo: normalizedEmail
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
