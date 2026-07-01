import nodemailer from 'nodemailer';

// ─── SS1: no-reply@smartprinthelp.com ─────────────────────────────────────
// Used for sending OTP emails to users
// NOTE: Update EMAIL_NOREPLY_PASS in .env.local with the correct password
// for no-reply@smartprinthelp.com from your hosting control panel.
// Until then, OTPs are sent via contact@smartprinthelp.com as fallback.

let otpTransporter = null;

const getOtpTransporter = async () => {
  if (otpTransporter) return otpTransporter;

  // Try ss1 (no-reply) first, fall back to ss2 (contact) if no dedicated pass set
  const noreplyPass = process.env.EMAIL_NOREPLY_PASS;

  otpTransporter = nodemailer.createTransport({
    host: 'mail.smartprinthelp.com',
    port: 465,
    secure: true,
    auth: {
      user: noreplyPass ? 'no-reply@smartprinthelp.com' : 'contact@smartprinthelp.com',
      pass: noreplyPass || process.env.Form_email_password
    },
    tls: { rejectUnauthorized: false }
  });
  return otpTransporter;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email, otp, type = 'registration') => {
  try {
    const trans = await getOtpTransporter();

    const subject = type === 'registration'
      ? 'Verify Your Account - Smart Print Help'
      : 'Reset Your Password - Smart Print Help';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Smart Print Help</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">${type === 'registration' ? 'Account Verification' : 'Password Reset'}</p>
        </div>
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">${type === 'registration' ? 'Verify Your Account' : 'Reset Your Password'}</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">Hello!</p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            ${type === 'registration' ? 'Thank you for registering with Smart Print Help. Your OTP code is:' : 'We received a request to reset your password. Your OTP code is:'}
          </p>
          <div style="background-color: #f8f9fa; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
          </div>
          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            This code will expire in <strong>10 minutes</strong>. Please use it to ${type === 'registration' ? 'verify your account' : 'reset your password'}.
          </p>
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>Security Notice:</strong> If you didn't request this, please ignore this email. Your account remains secure.
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated message from Smart Print Help. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;

    const senderEmail = process.env.EMAIL_NOREPLY_PASS
      ? 'no-reply@smartprinthelp.com'
      : 'contact@smartprinthelp.com';

    const result = await trans.sendMail({
      from: `"Smart Print Help" <${senderEmail}>`,
      to: email,
      subject,
      html
    });

    console.log('✅ OTP email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ OTP email sending failed (ss1):', error);
    console.log('🔧 DEV MODE: OTP is:', otp, '- Use this for testing if email fails');
    return { messageId: 'error-fallback', error: error.message };
  }
};

// ─── SS2: contact@smartprinthelp.com ──────────────────────────────────────
// Used for receiving form data (contact forms, printer setup registrations, etc.)

let contactTransporter = null;

const getContactTransporter = async () => {
  if (contactTransporter) return contactTransporter;
  contactTransporter = nodemailer.createTransport({
    host: 'mail.smartprinthelp.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@smartprinthelp.com',
      pass: process.env.Form_email_password
    },
    tls: { rejectUnauthorized: false }
  });
  return contactTransporter;
};

export const sendEmail = async ({ to, subject, html, text, from, replyTo }) => {
  try {
    const trans = await getContactTransporter();

    const result = await trans.sendMail({
      from: from || '"Smart Print Help" <contact@smartprinthelp.com>',
      to,
      replyTo,
      subject,
      text,
      html
    });

    console.log('✅ Contact/form email sent via ss2:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Contact/form email sending failed (ss2):', error);
    throw error;
  }
};
