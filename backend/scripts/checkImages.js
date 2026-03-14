import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';
import fetch from 'node-fetch';

const run = async () => {
  try {
    await connectDB();
    const products = await productModel.find({});
    const results = [];
    for (const p of products) {
      const urls = p.image || [];
      for (const url of urls) {
        try {
          const res = await fetch(url, { method: 'HEAD' , timeout: 10000});
          results.push({ name: p.name, url, status: res.status });
        } catch (err) {
          results.push({ name: p.name, url, error: err.message });
        }
      }
    }
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();