import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.get('/', (_req,res) => res.json({ app:'ChatSphere API', status:'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
