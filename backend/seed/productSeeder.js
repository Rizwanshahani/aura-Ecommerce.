import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ override: false });

const ATLAS_URI = "mongodb+srv://rizwanshahani432_db_user:CcdVdPzYRNHPvJox@cluster0.rqiwjon.mongodb.net/aura-yt?appName=Cluster0";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    stock: Number,
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: { type: Array, default: [] }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const products = [
    {
        name: "MacBook Pro M3",
        description: "Supercharged by the Apple M3 chip. Features a gorgeous Liquid Retina XDR display, up to 22 hours of battery life, and high-performance unified memory.",
        price: 1599,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
        stock: 12,
        rating: 4.8,
        numReviews: 2
    },
    {
        name: "iPhone 15 Pro",
        description: "Forged in titanium, featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
        price: 999,
        category: "Smartphones",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60",
        stock: 18,
        rating: 4.6,
        numReviews: 1
    },
    {
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise cancelling wireless headphones. Exceptional sound, crystal-clear call quality, and 30-hour battery life.",
        price: 349,
        category: "Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        stock: 25,
        rating: 4.7,
        numReviews: 1
    },
    {
        name: "Apple Watch Series 9",
        description: "Smartwatch with powerful health and safety features. Features the S9 SiP chip, a brighter display, and the double tap gesture.",
        price: 399,
        category: "Smartwatches",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
        stock: 15,
        rating: 4.5,
        numReviews: 0
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "Explore the new era of mobile AI. 200MP camera, built-in S Pen, and Snapdragon 8 Gen 3 processor.",
        price: 1199,
        category: "Smartphones",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
        stock: 10,
        rating: 4.8,
        numReviews: 0
    },
    {
        name: "Dell XPS 15",
        description: "Stunning OLED display, Intel Core i9, and NVIDIA GeForce RTX GPU. Perfect laptop for content creators and professionals.",
        price: 1799,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
        stock: 8,
        rating: 4.4,
        numReviews: 0
    },
    {
        name: "Bose QuietComfort Ultra",
        description: "Spatial audio wireless earbuds. World-class quiet, immersive sound, and custom-tuned audio matching your ear canal.",
        price: 299,
        category: "Headphones",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        stock: 30,
        rating: 4.5,
        numReviews: 0
    },
    {
        name: "Anker MagGo Wireless Charger",
        description: "High-speed magnetic wireless charging stand. Compatible with iPhone 12/13/14/15 series. Sleek desktop charging solution.",
        price: 49,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=500&auto=format&fit=crop&q=60",
        stock: 50,
        rating: 4.3,
        numReviews: 0
    }
];

// Seed route — only works if DB is empty
export const seedProducts = async (req, res) => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('localhost')
            ? process.env.MONGO_URI
            : ATLAS_URI;

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(uri);
        }

        const existing = await Product.countDocuments();
        if (existing > 0) {
            return res.json({ success: true, message: `Already has ${existing} products. No seed needed.` });
        }

        const inserted = await Product.insertMany(products);
        res.json({ success: true, message: `Seeded ${inserted.length} products successfully!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
