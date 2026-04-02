// ...existing code...
import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';



// Load env vars as early as possible
dotenv.config({
  path: './.env'
});

// Debug: Check environment variables
console.log('Environment variables:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODSE_URI?.substring(0, 20) + '...'
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

    app.listen(PORT, () => {
      console.log('Server listening on port', PORT);
    });
  
