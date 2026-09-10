import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ override: false }) // Vercel env vars take priority over .env file
import connectDB from './database/db.js';
import { seedProducts } from './seed/productSeeder.js';
import { setupAdmin } from './seed/adminSetup.js';
import userRoute from './routes/userRoute.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: true,
    credentials: true
}))

// Connect to DB before handling any API request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Database connection failed: ' + err.message
        });
    }
});

// One-time seed route — populates Atlas if empty
app.get('/api/v1/seed', seedProducts);

// Force reseed — clears ALL products and reseeds with correct electronics
app.get('/api/v1/reseed', async (req, res) => {
    try {
        const Product = (await import('./models/productModel.js')).default;
        await Product.deleteMany({});
        const products = [
            { name: "MacBook Pro M3", description: "Supercharged by the Apple M3 chip. Features a gorgeous Liquid Retina XDR display, up to 22 hours of battery life.", price: 1599, category: "Laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", stock: 12, rating: 4.8, numReviews: 0 },
            { name: "iPhone 15 Pro", description: "Forged in titanium, featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.", price: 999, category: "Smartphones", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60", stock: 18, rating: 4.6, numReviews: 0 },
            { name: "Sony WH-1000XM5", description: "Industry-leading noise cancelling wireless headphones. Exceptional sound, crystal-clear call quality, and 30-hour battery life.", price: 349, category: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", stock: 25, rating: 4.7, numReviews: 0 },
            { name: "Apple Watch Series 9", description: "Smartwatch with powerful health and safety features. The S9 SiP chip, brighter display, and double tap gesture.", price: 399, category: "Smartwatches", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60", stock: 15, rating: 4.5, numReviews: 0 },
            { name: "Samsung Galaxy S24 Ultra", description: "Explore the new era of mobile AI. 200MP camera, built-in S Pen, and Snapdragon 8 Gen 3 processor.", price: 1199, category: "Smartphones", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60", stock: 10, rating: 4.8, numReviews: 0 },
            { name: "Dell XPS 15", description: "Stunning OLED display, Intel Core i9, and NVIDIA GeForce RTX GPU. Perfect for content creators and professionals.", price: 1799, category: "Laptops", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60", stock: 8, rating: 4.4, numReviews: 0 },
            { name: "Bose QuietComfort Ultra", description: "Spatial audio wireless earbuds. World-class quiet, immersive sound, and custom-tuned audio.", price: 299, category: "Headphones", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60", stock: 30, rating: 4.5, numReviews: 0 },
            { name: "Anker MagGo Wireless Charger", description: "High-speed magnetic wireless charging stand. Compatible with iPhone 12/13/14/15 series.", price: 49, category: "Accessories", image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=500&auto=format&fit=crop&q=60", stock: 50, rating: 4.3, numReviews: 0 },
            { name: "iPad Pro M2", description: "The ultimate iPad experience with the M2 chip, stunning Liquid Retina XDR display, and Apple Pencil hover.", price: 1099, category: "Laptops", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60", stock: 20, rating: 4.7, numReviews: 0 },
            { name: "Samsung 4K QLED TV 65\"", description: "Quantum Dot technology for vivid colors. AI-powered picture and sound with smart home integration.", price: 1299, category: "Accessories", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4bda0?w=500&auto=format&fit=crop&q=60", stock: 5, rating: 4.6, numReviews: 0 },
            { name: "DJI Mini 4 Pro Drone", description: "Compact drone with 4K HDR video, obstacle sensing, and 34-minute flight time. Perfect for aerial photography.", price: 759, category: "Accessories", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&auto=format&fit=crop&q=60", stock: 10, rating: 4.8, numReviews: 0 },
            { name: "Logitech MX Master 3S", description: "Advanced wireless mouse with ultra-fast scrolling, ergonomic design, and 8K DPI sensor.", price: 99, category: "Accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60", stock: 40, rating: 4.5, numReviews: 0 }
        ];
        await Product.insertMany(products);
        res.json({ success: true, message: `✅ Reseeded ${products.length} electronics products!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// One-time setup: clears DB and creates admin account
app.get('/api/v1/setup-admin', setupAdmin);

// Delete all users except admin
app.get('/api/v1/clear-users', async (req, res) => {
    try {
        const User = (await import('./models/userModel.js')).default;
        const result = await User.deleteMany({ role: { $ne: 'admin' } });
        res.json({
            success: true,
            message: `✅ Deleted ${result.deletedCount} non-admin users. Admin account kept.`
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Test email configuration
app.get('/api/v1/test-email', async (req, res) => {
    try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        await transporter.verify();
        res.json({
            success: true,
            message: '✅ Email config is valid! Credentials work.',
            mail_user: process.env.MAIL_USER,
            mail_pass_set: !!process.env.MAIL_PASS
        });
    } catch (err) {
        res.json({
            success: false,
            error: err.message,
            mail_user: process.env.MAIL_USER,
            mail_pass_set: !!process.env.MAIL_PASS,
            fix: 'Generate a Gmail App Password for ' + process.env.MAIL_USER + ' at myaccount.google.com/apppasswords'
        });
    }
});

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

app.get('/api/v1/healthcheck', async (req, res) => {
    const mongoose = await import('mongoose');
    res.json({
        success: true,
        mongo_uri_set: !!process.env.MONGO_URI,
        mongo_uri_preview: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 40) + '...' : 'NOT SET',
        readyState: mongoose.default.connection.readyState,
        node_env: process.env.NODE_ENV || 'not set'
    });
});

app.get('/api/v1/debug', async (req, res) => {
    try {
        await connectDB();
        const mongoose = await import('mongoose');
        res.json({
            success: true,
            readyState: mongoose.default.connection.readyState,
            host: mongoose.default.connection.host
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}

export default app;