import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js';
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

// Middleware: ensure DB is connected before every request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Database connection failed: ${error.message}`
        });
    }
});

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

// Healthcheck — shows DB connection status and env var presence
app.get('/api/v1/healthcheck', (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
        mongo_uri_set: !!process.env.MONGO_URI,
        secret_key_set: !!process.env.SECRET_KEY,
        node_env: process.env.NODE_ENV || 'not set'
    });
});

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`);
    });
}

export default app;