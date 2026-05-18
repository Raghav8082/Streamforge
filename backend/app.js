import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoute from './routes/user_route.js';
import videoRoute from './routes/video_routes.js';
import workerRoute from './routes/worker_route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Streaming Platform API is running',
  });
});

app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

app.get('/favicon.png', (_req, res) => {
  res.status(204).end();
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/video', videoRoute);
app.use('/api/v1/worker', workerRoute); // Webhook endpoint for worker

export default app;
