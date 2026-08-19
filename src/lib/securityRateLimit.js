import { connectDB } from '@/lib/mongodb';
import SecurityRateLimit from '@/models/SecurityRateLimit';

export const RATE_LIMITS = {
  global: { limit: 120, windowMs: 60 * 1000 },
  landing: { limit: 40, windowMs: 60 * 1000 },
  api: { limit: 30, windowMs: 60 * 1000 },
  auth: { limit: 10, windowMs: 60 * 1000 },
  submission: { limit: 5, windowMs: 10 * 60 * 1000 },
};

export async function checkDistributedRateLimit({ identifier, scope, limit, windowMs }) {
  await connectDB();

  const bucket = Math.floor(Date.now() / windowMs);
  const key = `${scope}:${identifier}:${bucket}`;
  const expiresAt = new Date((bucket + 1) * windowMs + 60 * 1000);
  const record = await SecurityRateLimit.findOneAndUpdate(
    { _id: key },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    allowed: record.count <= limit,
    count: record.count,
    remaining: Math.max(0, limit - record.count),
    resetAt: expiresAt,
  };
}