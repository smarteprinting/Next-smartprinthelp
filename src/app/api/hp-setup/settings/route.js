import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HPSettings from '@/models/HPSettings';
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
    const settings = await HPSettings.findById('hp-global').lean();
    if (settings) {
      return NextResponse.json({
        allowStartNow: settings.allowStartNow
      });
    } else {
      return NextResponse.json({
        allowStartNow: true
      });
    }
  } catch (error) {
    console.error('HPSettings GET error:', error);
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
    const { allowStartNow } = body;

    const settingsData = {
      allowStartNow: typeof allowStartNow === 'boolean' ? allowStartNow : true
    };

    await HPSettings.updateOne({ _id: 'hp-global' }, { $set: settingsData }, { upsert: true });

    return NextResponse.json({ success: true, ...settingsData });
  } catch (error) {
    console.error('HPSettings POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings.' }, { status: 500 });
  }
}
