import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRoute.js'
import debugRouter from './routes/debugRoute.js'
import path from 'path'

const app = express()
const port = process.env.PORT || 4000

// Middlewares — before everything
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true
}))
app.use(express.json())

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const startServer = async () => {
    try {
        await connectDB();
        console.log('DB connection (attempted)');
    } catch (err) {
        console.error('DB connection failed during startup:', err);
    }

    try {
        await connectCloudinary();
        console.log('Cloudinary configured');
    } catch (err) {
        console.error('Cloudinary configuration failed:', err);
    }

    // Serve uploaded images and public assets
    app.use('/images', express.static(path.join(process.cwd(), 'uploads')));
    app.use(express.static(path.join(process.cwd(), 'public')));

    // API endpoints
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/order', orderRouter)
    app.use('/debug', debugRouter)

    app.get('/', (req, res) => {
        res.send("API Working")
    })

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server started on PORT : ${port}`);
    });
}

startServer();