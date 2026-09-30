import mongoose from 'mongoose';

const hpSettingsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  allowStartNow: { type: Boolean, default: true },
}, {
  timestamps: true
});

export default mongoose.models.HPSettings || mongoose.model('HPSettings', hpSettingsSchema);
