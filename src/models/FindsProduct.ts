import mongoose, { Schema, Document } from "mongoose";

/**
 * FindsProduct — TypeScript mongoose model that mirrors the OOPBUY schema.
 * Bound to the MongoDB collection `productList` (NOT the legacy `micky_products`
 * collection, which is still owned by the MickyProduct model used by the admin UI).
 *
 * Keep this model and MickyProduct strictly separate — they live in different
 * collections and serve different parts of the app.
 */
export interface IFindsProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category?: string;
  images: (string | { url: string })[];
  hidden: boolean;
  creatorName?: string;
  store?: string;
  id?: string;
  viewCount?: number;
  boosts?: { boostPage?: string; validUntil?: Date; amount?: number }[];
  findsOfTheWeekUntil?: Date;
  purchased?: number;
  searchPriority?: number;
  createdAt: Date;
  updatedAt: Date;
}

const FindsProductSchema = new Schema<IFindsProduct>(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String, index: true },
    images: { type: Array, default: [] },
    hidden: { type: Boolean, default: false, index: true },
    creatorName: { type: String, index: true },
    store: { type: String },
    id: { type: String },
    viewCount: { type: Number, default: 0 },
    boosts: { type: Array, default: [] },
    findsOfTheWeekUntil: { type: Date },
    purchased: { type: Number, default: 0 },
    searchPriority: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "productList" }
);

// Compound indexes for the most common query patterns
FindsProductSchema.index({ hidden: 1, category: 1 });
FindsProductSchema.index({ hidden: 1, creatorName: 1 });

export default (mongoose.models.FindsProduct as mongoose.Model<IFindsProduct>) ||
  mongoose.model<IFindsProduct>("FindsProduct", FindsProductSchema, "productList");
