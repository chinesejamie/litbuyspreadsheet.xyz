import mongoose, { Schema, Document } from "mongoose";

export interface IOutfit extends Document {
  name: string;
  image: string;
  creator: "timmy" | "miki";
  products: mongoose.Types.ObjectId[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OutfitSchema = new Schema<IOutfit>(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    creator: { type: String, enum: ["timmy", "miki"], required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "MickyProduct" }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "micky_outfits" }
);

export default mongoose.models.MickyOutfit ||
  mongoose.model<IOutfit>("MickyOutfit", OutfitSchema);
