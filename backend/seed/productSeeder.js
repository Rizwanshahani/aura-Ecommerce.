import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const products = [
    {
        name: "MacBook Pro M3",
        description: "Supercharged by the Apple M3 chip. Features a gorgeous Liquid Retina XDR display, up to 22 hours of battery life, and high-performance unified memory.",
        price: 1599,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
        stock: 12,
        rating: 4.8,
        numReviews: 0,
        reviews: []
    },
    {
        name: "iPhone 15 Pro",
        description: "Forged in titanium, featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
        price: 999,
        category: "Smartphones",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60",
        stock: 18,
        rating: 4.6,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise cancelling wireless headphones. Exceptional sound, crystal-clear call quality, and 30-hour battery life.",
        price: 349,
        category: "Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        stock: 25,
        rating: 4.7,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Apple Watch Series 9",
        description: "Smartwatch with powerful health and safety features. The S9 SiP chip, brighter display, and double tap gesture.",
        price: 399,
        category: "Smartwatches",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
        stock: 15,
        rating: 4.5,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "Explore the new era of mobile AI. 200MP camera, built-in S Pen, and Snapdragon 8 Gen 3 processor.",
        price: 1199,
        category: "Smartphones",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
        stock: 10,
        rating: 4.8,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Dell XPS 15",
        description: "Stunning OLED display, Intel Core i9, and NVIDIA GeForce RTX GPU. Perfect for content creators and professionals.",
        price: 1799,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
        stock: 8,
        rating: 4.4,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Bose QuietComfort Ultra",
        description: "Spatial audio wireless earbuds. World-class quiet, immersive sound, and custom-tuned audio.",
        price: 299,
        category: "Headphones",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        stock: 30,
        rating: 4.5,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Anker MagGo Wireless Charger",
        description: "High-speed magnetic wireless charging stand. Compatible with iPhone 12/13/14/15 series.",
        price: 49,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500&auto=format&fit=crop&q=60",
        stock: 50,
        rating: 4.3,
        numReviews: 0,
        reviews: []
    },
    {
        name: "iPad Pro M2",
        description: "The ultimate iPad experience with the M2 chip, stunning Liquid Retina XDR display, and Apple Pencil hover.",
        price: 1099,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60",
        stock: 20,
        rating: 4.7,
        numReviews: 0,
        reviews: []
    },
    {
        name: "DJI Mini 4 Pro Drone",
        description: "Compact drone with 4K HDR video, obstacle sensing, and 34-minute flight time. Perfect for aerial photography.",
        price: 759,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&auto=format&fit=crop&q=60",
        stock: 10,
        rating: 4.8,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Logitech MX Master 3S",
        description: "Advanced wireless mouse with ultra-fast scrolling, ergonomic design, and 8K DPI sensor.",
        price: 99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60",
        stock: 40,
        rating: 4.5,
        numReviews: 0,
        reviews: []
    },
    {
        name: "Samsung 4K QLED TV 65\"",
        description: "Quantum Dot technology for vivid colors. AI-powered picture and sound with smart home integration.",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60",
        stock: 5,
        rating: 4.6,
        numReviews: 0,
        reviews: []
    }
];

export const seedProducts = async (req, res) => {
    try {
        const existing = await Product.countDocuments();
        if (existing > 0) {
            return res.json({ success: true, message: `Database already has ${existing} products.`, count: existing });
        }

        const inserted = await Product.insertMany(products);
        res.json({ success: true, message: `✅ Seeded ${inserted.length} products successfully!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
