import { Schema, model, Document } from "mongoose";

interface ILocation extends Document {
  name: string;
  address: string;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export const Location = model<ILocation>("Location", locationSchema);
export type { ILocation };
