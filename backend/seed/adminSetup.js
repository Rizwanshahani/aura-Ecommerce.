import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';

export const setupAdmin = async (req, res) => {
    try {
        // Clear all users and orders
        await User.deleteMany({});
        await Order.deleteMany({});

        // Hash password with static bcrypt import (guaranteed to work with login)
        const hashedPassword = await bcrypt.hash('Admin@1234', 10);

        // Create admin
        const admin = await User.create({
            firstName: 'Rizwan',
            lastName: 'Shahani',
            email: 'rizwanshahani432@gmail.com',
            password: hashedPassword,
            role: 'admin',
            isVerified: true,
            isLoggedIn: false
        });

        res.json({
            success: true,
            message: '✅ Database cleared & admin account created!',
            login: {
                email: 'rizwanshahani432@gmail.com',
                password: 'Admin@1234',
                role: 'admin'
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
