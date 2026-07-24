import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

const app = express()

// Connect to MongoDB immediately at module load time
// (Required for Vercel serverless — app.listen() never runs there)
connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes)

app.get('/api/v1/healthcheck', (req, res) => {
    res.json({ success: true, message: 'Server is healthy and routes are loaded' });
});

// Only listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`);
    });
}

export default app;