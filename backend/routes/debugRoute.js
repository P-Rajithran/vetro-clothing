import express from 'express'
import productModel from '../models/productModel.js'

const debugRouter = express.Router()

// Returns an HTML page with server-rendered JSON of products
debugRouter.get('/static-products', async (req, res) => {
  try {
    const products = await productModel.find({})
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';
    const itemsHtml = products.map(p => `
      <div style="display:inline-block;margin:10px;border:1px solid #eee;padding:8px;width:200px;text-align:center;">
        <img src="${(p.image && p.image[0]) || `${frontendUrl}/placeholder.png`}" alt="${p.name}" style="width:180px;height:180px;object-fit:cover;display:block;margin:0 auto 8px;" />
        <div style="font-weight:600">${p.name}</div>
        <div style="font-size:12px;color:#666">${p.category} / ${p.subCategory}</div>
      </div>
    `).join('\n');

    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Debug Products</title></head>
<body>
<h1>Products (${products.length})</h1>
<div style="display:flex;flex-wrap:wrap">${itemsHtml}</div>
<hr/>
<pre style="max-height:300px;overflow:auto">${JSON.stringify(products, null, 2)}</pre>
</body>
</html>`
    res.status(200).send(html)
  } catch (err) {
    console.error('Debug route error', err)
    res.status(500).send('Server error')
  }
})

export default debugRouter
