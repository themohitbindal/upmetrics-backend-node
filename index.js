import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';
import swaggerSpec from './config/swagger.js';
import seedCategories from './config/seedCategories.js';
import categoryRoutes from './routes/categoryRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all interfaces for EC2

// CORS Configuration - Allow all origins
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// from public directory this tells to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

// todo:remove later (Public Routes for testing)
app.get('/', (req, res) => {
    res.send('Hello World! Server is running and this is for testing server at  /');
});

// Swagger Documentation for testing
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Task Management API Documentation'
}));

app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/tasks', protect, taskRoutes);
app.use('/api/categories', protect, categoryRoutes);
app.use('/api/users', protect, userRoutes);

const startServer = async () => {
    try {
        await connectDB();
        await seedCategories();
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
