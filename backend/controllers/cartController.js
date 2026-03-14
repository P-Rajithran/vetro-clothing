import userModel from "../models/userModel.js";

// ✅ Add to Cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user?._id; 

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    if (!itemId || !size) return res.status(400).json({ success: false, message: "Item ID and size are required" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const cart = user.cartData || {};
    cart[itemId] = cart[itemId] || {};
    cart[itemId][size] = (cart[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData: cart } }); // ✅ fixed

    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ✅ Added safety check (only change)
    if (!user.cartData || !user.cartData[itemId] || !user.cartData[itemId][size]) {
      return res.status(400).json({ success: false, message: "Item/size not found in cart" });
    }

    // Original deletion logic (unchanged)
    delete user.cartData[itemId][size];
    if (Object.keys(user.cartData[itemId]).length === 0) {
      delete user.cartData[itemId];
    }

    await user.save();
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update Cart Item Quantity
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
   if (!itemId || !size || !Number.isFinite(quantity) || quantity <= 0) return res.status(400).json({ success: false, message: "Invalid input" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const cart = user.cartData || {};
    if (!cart[itemId] || !cart[itemId][size]) return res.status(400).json({ success: false, message: "Item/size not found in cart" });

    cart[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { $set: { cartData: cart } }, { new: true });

    res.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get User Cart Data
const getUserCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    

    res.status(200).json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("Get User Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}; 

export { addToCart, removeFromCart, updateCart, getUserCart };