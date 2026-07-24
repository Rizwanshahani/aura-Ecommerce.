import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // already connected or connecting
    }

    if (!MONGO_URI) {
        throw new Error("MONGO_URI environment variable is missing");
    }

    return mongoose.connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 30000,
        maxPoolSize: 10,
    });
};

export default connectDB;