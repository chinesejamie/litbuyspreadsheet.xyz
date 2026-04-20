import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  images: string[];
  link: string;
  store: string;
  storeProductId: string;
  hidden: boolean;
  featured: boolean;
  isBrandProduct: boolean;
  brandLogo: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "" },
    category: { type: String, required: true },
    subcategory: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    link: { type: String, default: "#" },
    store: { type: String, default: "" },
    storeProductId: { type: String, default: "" },
    hidden: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    isBrandProduct: { type: Boolean, default: false },
    brandLogo: { type: String, default: "" },
  },
  { timestamps: true, collection: "micky_products" }
);

ProductSchema.index({ hidden: 1, category: 1 });

export default mongoose.models.MickyProduct ||
  mongoose.model<IProduct>("MickyProduct", ProductSchema);
