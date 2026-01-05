import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { ConnectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config()

const PORT = process.env.PORT


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth', authRoutes)
app.use('/messages', messageRoutes)



server.listen(PORT || 4000, () => {
    console.log(` Server is running on port ${PORT}`)
    ConnectDB()
})