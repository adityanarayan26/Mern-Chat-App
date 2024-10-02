import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import messageRoutes from './routes/message.js';
import connectDB from './db/dbconnect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from './socket/socket.js'
import path from 'path'

const PORT = process.env.PORT || 8000;
dotenv.config()
const __dirname = path.resolve()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'https://mern-chat-app-51h0.onrender.com',
    credentials: true // Allow credentials (cookies)
}));
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api', userRoutes)
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist', 'index.html'));
});

server.listen(PORT, () => {
    connectDB()
    console.log(`server running on port ${PORT}`);
})
