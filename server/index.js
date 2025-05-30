import express from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './config/cors.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';
dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5004;


app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});