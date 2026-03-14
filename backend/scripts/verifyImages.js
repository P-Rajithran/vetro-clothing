import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import productModel from '../models/productModel.js';
import fetch from 'node-fetch';

const run = async () => {
  try {
    await connectDB();
    const products = await productModel.find({});
    let missing = 0;
    for (const p of products) {
      for (const url of p.image || []) {
        try {
          const res = await fetch(url, { method: 'HEAD', timeout: 5000 });
          if (!res.ok) {
            console.log(`BROKEN: ${p.name} -> ${url} (status ${res.status})`);
            missing++;
          }
        } catch (err) {
          console.log(`ERROR FETCH: ${p.name} -> ${url} (${err.message})`);
          missing++;
        }
      }
    }
    console.log('Done. Missing/invalid images:', missing);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
