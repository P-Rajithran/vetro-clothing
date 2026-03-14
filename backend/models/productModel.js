import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: String,
  price: Number,
  category: String,
  subCategory: String,
  bestseller: Boolean,
  sizes: [String],
  image: [String],
  date: { type: Date, default: Date.now }
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
