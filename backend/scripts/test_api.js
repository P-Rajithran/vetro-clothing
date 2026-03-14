#!/usr/bin/env node

// Simple connectivity test script for backend API
// Usage: node scripts/test_api.js

const fetch = global.fetch || require('node-fetch');
const backend = process.env.BACKEND_URL || 'http://localhost:4000';

const endpoints = [
  '/',
  '/api/product/list',
  '/debug/static-products'
];

(async () => {
  console.log(`Testing backend connectivity against: ${backend}`);
  for (const ep of endpoints) {
    const url = backend.replace(/\/$/, '') + ep;
    try {
      const res = await fetch(url, { method: 'GET' });
      console.log(`${url} -> ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`${url} -> ERROR: ${err.message}`);
    }
  }

  // Check an example image (placeholder)
  const imgUrl = (process.env.BACKEND_URL || 'http://localhost:4000') + '/placeholder.png';
  try {
    const res = await fetch(imgUrl, { method: 'HEAD' });
    console.log(`${imgUrl} -> ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(`${imgUrl} -> ERROR: ${err.message}`);
  }
})();
