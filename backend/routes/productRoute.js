import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// ✅ Add a new product (with images upload)
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// ✅ Remove a product (Changed from POST to DELETE)
productRouter.delete('/remove', adminAuth, removeProduct);

productRouter.get('/list', listProducts);        // ✅ moved up
productRouter.get('/:id', singleProduct);        // ✅ moved down


export default productRouter;