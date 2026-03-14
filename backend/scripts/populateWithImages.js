import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';

/**
 * This script populates the database with sample products that have real images
 * Images are sourced from Cloudinary's fetch feature which pulls from free stock image sources
 * 
 * To use this script:
 * 1. Make sure MongoDB is running and MONGO_URI is set in .env
 * 2. Run: node scripts/populateWithImages.js
 * 
 * To clear and reseed (WARNING: Clears all products):
 * 1. Run: node scripts/populateWithImages.js --clear
 */

const sampleProductsWithImages = [
  {
    name: 'Classic White T-Shirt',
    description: 'A versatile white t-shirt perfect for any occasion. Made from high-quality cotton.',
    price: 1999,
    category: 'Clothing',
    subCategory: 'Tops',
    bestseller: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Black Casual Jeans',
    description: 'Comfortable black jeans suitable for casual wear. Modern design with excellent fit.',
    price: 4999,
    category: 'Clothing',
    subCategory: 'Bottoms',
    bestseller: true,
    sizes: ['28', '30', '32', '34', '36', '38'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Blue Denim Jacket',
    description: 'Classic blue denim jacket timeless style. Perfect layering piece for any wardrobe.',
    price: 5999,
    category: 'Outerwear',
    subCategory: 'Jackets',
    bestseller: false,
    sizes: ['S', 'M', 'L', 'XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1544022783-d2af4a1c65fe?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Cozy Gray Hoodie',
    description: 'Warm and comfortable gray hoodie. Perfect for casual days and outdoor activities.',
    price: 3999,
    category: 'Clothing',
    subCategory: 'Winterwear',
    bestseller: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1556821552-9f41271e8b92?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Summer Floral Dress',
    description: 'Light and breezy floral dress perfect for summer. Comfortable and stylish.',
    price: 3499,
    category: 'Clothing',
    subCategory: 'Dresses',
    bestseller: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1595777707802-41d339d60280?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1595607865269-0ba8b1e56edb?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'White Sneakers',
    description: 'Classic white sneakers perfect for everyday wear. Clean design and comfortable fit.',
    price: 4499,
    category: 'Footwear',
    subCategory: 'Shoes',
    bestseller: true,
    sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1595777707917-04d5b0123b69?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Striped Linen Shirt',
    description: 'Lightweight striped linen shirt ideal for warm weather. Breathable and stylish.',
    price: 2999,
    category: 'Clothing',
    subCategory: 'Tops',
    bestseller: false,
    sizes: ['S', 'M', 'L', 'XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1606993537700-c6e1d3b62ebb?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1589902388159-2e9a92dd6b4f?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Cargo Pants',
    description: 'Practical cargo pants with multiple pockets. Great for adventure and outdoor activities.',
    price: 3499,
    category: 'Clothing',
    subCategory: 'Bottoms',
    bestseller: false,
    sizes: ['28', '30', '32', '34', '36'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1542576921619-336cc3e24e51?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Red Winter Coat',
    description: 'Stylish red winter coat. Warm insulation for cold weather protection.',
    price: 7999,
    category: 'Outerwear',
    subCategory: 'Coats',
    bestseller: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1539533057440-7814a55d69de?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1551571174-e57d8b4d4ff8?w=500&h=500&fit=crop'
    ]
  },
  {
    name: 'Black Leather Belt',
    description: 'Classic black leather belt. A versatile accessory that goes with everything.',
    price: 1499,
    category: 'Accessories',
    subCategory: 'Belts',
    bestseller: false,
    sizes: ['30', '32', '34', '36', '38'],
    image: [
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
      'https://res.cloudinary.com/demo/image/fetch/https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&h=500&fit=crop'
    ]
  }
];

const populate = async () => {
  try {
    await connectDB();
    console.log('✓ Connected to MongoDB');

    const shouldClear = process.argv.includes('--clear');

    if (shouldClear) {
      await productModel.deleteMany({});
      console.log('✓ Cleared all existing products');
    }

    // Check for existing products to avoid duplicates
    const existingCount = await productModel.countDocuments({});
    console.log(`Current products in DB: ${existingCount}`);

    const productsToAdd = [];
    for (const product of sampleProductsWithImages) {
      const exists = await productModel.findOne({ name: product.name });
      if (!exists) {
        productsToAdd.push(product);
      }
    }

    if (productsToAdd.length === 0) {
      console.log('ℹ All sample products already exist in the database');
    } else {
      const result = await productModel.insertMany(productsToAdd);
      console.log(`✓ Added ${result.length} products to database`);
      console.log('Products added:');
      result.forEach(p => {
        console.log(`  - ${p.name} (${p.image.length} images)`);
      });
    }

    const totalProducts = await productModel.countDocuments({});
    console.log(`\n✓ Total products in database: ${totalProducts}`);
    console.log('\n✓ Script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

populate();
