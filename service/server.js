import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Bodyparser middleware    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
