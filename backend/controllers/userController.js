  import validator from "validator";
  import bcrypt from "bcryptjs";
  import userModel from "../models/userModel.js";
  import jwt from "jsonwebtoken";
  import "dotenv/config";
  import productModel from "../models/productModel.js";
  

  // ✅ Function to generate a JWT token (with expiration)
  const createToken = (id, role = "user") => {
    const token = jwt.sign({ _id: id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("Generated Token:", token); // Debugging
    return token;
  };

  // ✅ User Login Route
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login Attempt for:", email);

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User doesn't exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken(user._id);
        console.log("Sending Token to User:", token); // Debugging
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  // ✅ User Registration Route
  const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.status(409).json({ success: false, message: "User already exists" });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
      }

      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({ name, email, password: hashedPassword });
      const user = await newUser.save();
      const token = createToken(user._id);

      console.log("Sending Token to User:", token); // Debugging
      res.status(201).json({ success: true, token });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  // ✅ Admin Login Route
  const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = createToken("admin", "admin"); // Ensuring admin token is structured correctly
        console.log("Sending Admin Token:", token); // Debugging
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Admin Login Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  export { loginUser, registerUser, adminLogin };  