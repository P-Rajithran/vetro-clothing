import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';

const run = async () => {
  try {
    await connectDB();
    const products = await productModel.find({});
    let updated = 0;
    for (const p of products) {
      const first = (p.image && p.image[0]) || '';
      // If image is an external URL (http/https) and not a cloudinary URL, replace with local placeholder
      if (first.startsWith('http') && !first.includes('res.cloudinary.com')) {
        p.image = ['/placeholder.png'];
        await p.save();
        console.log('Set local placeholder for:', p.name);
        updated++;
      }
      // If no images at all, set local placeholder
      if (!first) {
        p.image = ['/placeholder.png'];
        await p.save();
        console.log('Added local placeholder for empty image:', p.name);
        updated++;
      }
    }
    console.log('Done. Updated:', updated);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();