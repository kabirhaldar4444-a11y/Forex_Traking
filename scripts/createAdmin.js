import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@forexshipping.com' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@forexshipping.com',
      password: 'password123',
      name: 'Admin',
      role: 'admin'
    });

    console.log('Default admin created successfully');
    console.log('Email: admin@forexshipping.com');
    console.log('Password: password123');
    console.log('\n⚠️  IMPORTANT: Change the password in production!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createDefaultAdmin();
