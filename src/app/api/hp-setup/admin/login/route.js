import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username: ADMIN_USER }, JWT_SECRET, { expiresIn: '24h' });
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('HP Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
