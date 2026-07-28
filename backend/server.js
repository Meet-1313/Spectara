import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sql } from './config/db.js';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import { registerUser, loginUser } from './controllers/authController.js';
import { verifyToken } from './middleware/verifyToken.js';
import movieRoutes from './routes/movieRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { redis } from './config/redis.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', async (req, res) => {
    res.send('Backend is running');
});

app.get('/profile', verifyToken, async (req, res) => {
    res.json({ success: true, message: 'Profile data', user: req.user });
})

async function initDatabase() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}


initDatabase().then(async () => {
    try {
        await redis.set('test', 'hello reids');
        const value = await redis.get('test');
        console.log('Redis is connected:', value);
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});