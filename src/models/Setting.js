import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  showHeader: { type: Boolean, default: true },
  showLogo: { type: Boolean, default: true },
  allowModelSearch: { type: Boolean, default: true },
  showCompleteSetupPage: { type: Boolean, default: true },
  showInstallationErrorPage: { type: Boolean, default: true },
  allowStartNow: { type: Boolean, default: true },
}, {
  timestamps: true
});

export default mongoose.models.Setting || mongoose.model('Setting', settingSchema);
