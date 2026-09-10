import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ override: false });
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: true,
    credentials: true
}));

// Connect to DB before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Service unavailable'
        });
    }
});

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);

// Health check (minimal, non-leaking)
app.get('/api/v1/healthcheck', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running'
    });
});

// Listen locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}

export default app;