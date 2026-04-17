import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Admin Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register Admin (protected route)
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      email,
      password,
      name,
      role: 'admin'
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current logged in admin
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);

    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
