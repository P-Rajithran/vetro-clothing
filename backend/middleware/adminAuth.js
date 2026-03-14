import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // Support both "Authorization: Bearer token" and "token: value"
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;