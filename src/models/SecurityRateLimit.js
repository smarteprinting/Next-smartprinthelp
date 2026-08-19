import mongoose from 'mongoose';

const securityRateLimitSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

securityRateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.SecurityRateLimit || mongoose.model('SecurityRateLimit', securityRateLimitSchema);