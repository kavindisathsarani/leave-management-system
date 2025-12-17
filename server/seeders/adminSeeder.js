require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

    // Create a sample employee user
    const existingEmployee = await User.findOne({ email: 'employee@example.com' });
    if (!existingEmployee) {
      const employee = new User({
        name: 'Employee User',
        email: 'employee@example.com',
        password: 'employee123',
        role: 'employee'
      });

      await employee.save();
      console.log('Employee user created successfully');
      console.log('Email: employee@example.com');
      console.log('Password: employee123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

