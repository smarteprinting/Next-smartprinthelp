import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Setting from '@/models/Setting';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const ADMIN_USER = 'admin';

function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.username === ADMIN_USER;
  } catch (error) {
    return false;
  }
}

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.findById('global').lean();
    if (settings) {
      return NextResponse.json({
        showHeader: settings.showHeader,
        showLogo: settings.showLogo,
        allowModelSearch: settings.allowModelSearch,
        showCompleteSetupPage: settings.showCompleteSetupPage,
        showInstallationErrorPage: settings.showInstallationErrorPage,
        allowStartNow: settings.allowStartNow
      });
    } else {
      return NextResponse.json({
        showHeader: true,
        showLogo: true,
        allowModelSearch: true,
        showCompleteSetupPage: true,
        showInstallationErrorPage: true,
        allowStartNow: true
      });
    }
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to load settings.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }
    await connectDB();
    const body = await request.json();
    const {
      showHeader,
      showLogo,
      allowModelSearch,
      showCompleteSetupPage,
      showInstallationErrorPage,
      allowStartNow
    } = body;

    const settingsData = {
      showHeader: typeof showHeader === 'boolean' ? showHeader : true,
      showLogo: typeof showLogo === 'boolean' ? showLogo : true,
      allowModelSearch: typeof allowModelSearch === 'boolean' ? allowModelSearch : true,
      showCompleteSetupPage: typeof showCompleteSetupPage === 'boolean' ? showCompleteSetupPage : true,
      showInstallationErrorPage: typeof showInstallationErrorPage === 'boolean' ? showInstallationErrorPage : true,
      allowStartNow: typeof allowStartNow === 'boolean' ? allowStartNow : true
    };

    await Setting.updateOne({ _id: 'global' }, { $set: settingsData }, { upsert: true });

    return NextResponse.json({ success: true, ...settingsData });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings.' }, { status: 500 });
  }
}
