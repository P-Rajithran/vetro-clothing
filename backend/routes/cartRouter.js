import express from 'express';
import { addToCart, getUserCart, updateCart, removeFromCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

// ✅ Get user's cart
cartRouter.get('/', authUser, getUserCart);

// ✅ Add an item to the cart
cartRouter.post('/add', authUser, addToCart);

// ✅ Update item quantity in the cart
cartRouter.put('/update', authUser, updateCart);

// ✅ Remove item from the cart
cartRouter.delete('/remove', authUser, removeFromCart);

export default cartRouter;