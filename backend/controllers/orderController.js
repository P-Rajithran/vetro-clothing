

import orderModel from '../models/orderModel.js';

// Place an order (used for COD and generic payments)
const placeOrder = async (req, res) => {
	try {
		const userId = req.user?._id;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const { items, amount, address, paymentMethod } = req.body;
		if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: 'Items required' });
		if (!amount) return res.status(400).json({ success: false, message: 'Amount required' });
		if (!address) return res.status(400).json({ success: false, message: 'Address required' });

		const newOrder = new orderModel({
			userId: userId.toString(),
			items,
			amount,
			address,
			paymentMethod: paymentMethod || 'COD',
			payment: paymentMethod && paymentMethod !== 'COD' ? true : false,
			date: Date.now(),
		});

		const saved = await newOrder.save();
		res.status(201).json({ success: true, order: saved });
	} catch (error) {
		console.error('Place Order Error:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

// Stripe placeholder - reuse placeOrder logic for now
const placeOrderStripe = async (req, res) => {
	return placeOrder(req, res);
};

// Razorpay placeholder - reuse placeOrder logic for now
const placeOrderRazorpay = async (req, res) => {
	return placeOrder(req, res);
};

// Admin: list all orders
const allOrders = async (req, res) => {
	try {
		const orders = await orderModel.find().sort({ date: -1 });
		res.status(200).json({ success: true, orders });
	} catch (error) {
		console.error('All Orders Error:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

// User: list user's orders
const userOrders = async (req, res) => {
	try {
		const userId = req.user?._id;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

		const orders = await orderModel.find({ userId: userId.toString() }).sort({ date: -1 });
		res.status(200).json({ success: true, orders });
	} catch (error) {
		console.error('User Orders Error:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

// Admin: update order status
const updateStatus = async (req, res) => {
	try {
		const { orderId, status } = req.body;
		if (!orderId || !status) return res.status(400).json({ success: false, message: 'orderId and status are required' });

		const order = await orderModel.findByIdAndUpdate(orderId, { $set: { status } }, { new: true });
		if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

		res.status(200).json({ success: true, order });
	} catch (error) {
		console.error('Update Status Error:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };