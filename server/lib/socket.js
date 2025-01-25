import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL]
    }
})

const ReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}

const userSocketMap = {};
io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id;

    io.emit('GetOnlineUsers', Object.keys(userSocketMap))
    socket.on('disconnect', () => {

        delete userSocketMap[userId]
        io.emit('GetOnlineUsers', Object.keys(userSocketMap))
    });

})





export { io, server, app ,ReceiverSocketId}