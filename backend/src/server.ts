import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routers';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler';


dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/sharing-todo';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

mongoose.connect(DB_CONNECTION_URI)
.then(() => console.log('[mongodb]: MongoDB connected'))
.catch(err => console.log('[mongodb]: Database connection error:', err))

app.use(router)
app.use(errorHandler);


app.listen(PORT, () =>{
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  
})