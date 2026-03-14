import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';

const placeholder = 'https://via.placeholder.com/600x600.png?text=No+Image';

const run = async () => {
  try {
    await connectDB();
    const products = await productModel.find({});
    let updated = 0;
    for (const p of products) {
      if (!p.image || p.image.length === 0) {
        p.image = [placeholder];
        await p.save();
        updated++;
        console.log('Updated product:', p.name);
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
