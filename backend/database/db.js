import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    // If already connected, return immediately
    if (mongoose.connection.readyState === 1) return;

    // If a connection is in progress, wait for it
    if (connectionPromise) return connectionPromise;

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    });

    try {
        await connectionPromise;
        console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        connectionPromise = null; // reset so next request can retry
        console.error("❌ MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;