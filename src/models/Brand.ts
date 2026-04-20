import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  logo: string;
  instagram: string;
  inFilter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    logo: { type: String, default: "" },
    instagram: { type: String, default: "#" },
    inFilter: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "micky_brands" }
);

export default mongoose.models.MickyBrand ||
  mongoose.model<IBrand>("MickyBrand", BrandSchema);
