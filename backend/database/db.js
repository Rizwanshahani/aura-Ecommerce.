import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return; // already connected

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI environment variable is not defined");
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            socketTimeoutMS: 30000,
            maxPoolSize: 10,
        });
        if (process.env.NODE_ENV !== "production") {
            console.log("MongoDB connected successfully");
        }
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error("MongoDB connection failed:", error.message);
        }
        throw error;
    }
};

export default connectDB;