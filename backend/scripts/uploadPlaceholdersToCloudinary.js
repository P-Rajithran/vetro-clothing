import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

const remoteUrl = 'https://via.placeholder.com/600x600.png?text=Vetro+Placeholder';

const run = async () => {
  try {
    await connectDB();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    const products = await productModel.find({});
    for (const p of products) {
      const hasExternal = p.image && p.image.length && p.image[0].startsWith('http');
      // Skip if it's already a cloudinary URL or not a placeholder
      if (hasExternal && p.image[0].includes('res.cloudinary.com')) {
        console.log('Skipping (already cloudinary):', p.name);
        continue;
      }

      console.log('Uploading placeholder for:', p.name);
      const result = await cloudinary.uploader.upload(remoteUrl, { folder: 'VetroProducts' });
      p.image = [result.secure_url];
      await p.save();
      console.log('Updated product with cloudinary image:', p.name);
    }

    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error('Upload error', err);
    process.exit(1);
  }
};

run();
