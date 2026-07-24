import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return; // reuse existing connection on Vercel

    if (!process.env.MONGO_URI) {
        console.error("❌ MONGO_URI environment variable is not set!");
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        throw error; // re-throw so the caller knows
    }
};

export default connectDB;