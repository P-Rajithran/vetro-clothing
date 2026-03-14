import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    // Early check for JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not configured");
    }

    // Extract token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authorization header missing or invalid" });
    }

    // More robust token extraction
    const tokenParts = authHeader.trim().split(' ');
    const token = tokenParts.length === 2 ? tokenParts[1] : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Malformed token. Format should be: 'Bearer <token>'",
      });
    }

    // Debugging: Log received token
    console.log("Received Token:", token);

    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging: Log decoded token info
    console.log("Decoded Token:", decoded);

    // Support tokens that store either `id` or `_id` in payload (for backward compatibility)
    const decodedId = decoded._id || decoded.id;
    
    if (!decodedId) {
      return res.status(401).json({ success: false, message: "Token missing user ID" });
    }

    // If token represents an admin (no user record), attach basic info and continue
    if (decoded.role === 'admin' && decodedId === 'admin') {
      req.user = { role: 'admin', _id: 'admin' };
      return next();
    }

    // Find user from decoded token ID
    const user = await userModel.findById(decodedId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user data to request (ensure _id is present)
    req.user = { ...user.toObject(), _id: user._id };
    next();
    
  } catch (err) {
    console.error("Auth error:", err.message);

    // More specific error responses
    let message = "Authentication failed";
    if (err.name === "JsonWebTokenError") {
      message = "Invalid token";
    } else if (err.name === "TokenExpiredError") {
      message = "Token expired";
    } else if (err.message.includes("JWT secret")) {
      message = "Server configuration error";
    }

    res.status(401).json({
      success: false,
      message,
    });
  }
};

export default authUser;