import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import expenseRoutes from './routes/expense.routes.js';

dotenv.config({});
const app = express();
const port = 8000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

// apis
app.use('/api/user', userRoutes);
app.use('/api/expense', expenseRoutes);

app.listen(port,(req,res)=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
});

