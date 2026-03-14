import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import fs from "fs"; // Optional: for cleaning up temp files

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
  return res.status(400).json({ success: false, message: "Price must be a positive number" });
}

    const parsedSizes = Array.isArray(sizes) ? sizes : (typeof sizes === 'string' ? JSON.parse(sizes) : []);

    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: "Product with this name already exists" });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];
    const images = [image1, image2, image3, image4].filter((img) => img !== undefined);

    if (!req.files || images.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "Product",
        });

        fs.unlink(item.path, (err) => {
          if (err) console.error("Failed to delete temp file:", err);
        });

        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const productId = req.body.id || req.params.id || req.query.id;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deleted = await productModel.findByIdAndDelete(productId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log("Error while deleting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id; // ✅ fixed

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { listProducts, addProduct, removeProduct, singleProduct };
