import mongoose, { Document, Schema } from "mongoose";

interface ISetting extends Document {
  isGlobalTrackingEnabled: boolean;
}

const SettingSchema = new Schema<ISetting>({
  isGlobalTrackingEnabled: { type: Boolean, required: true, default: true },
});

export const Setting = mongoose.model<ISetting>("Setting", SettingSchema);
