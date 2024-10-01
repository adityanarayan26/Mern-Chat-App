import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})


const useSocketMap = {}  //userId : socketId

export const ReceiverId = (receiverid) => {
    return useSocketMap[receiverid]
}

io.on("connection", (socket) => {
    console.log('user connected', socket.id);

    const userId = socket.handshake.query.userId
    if (userId !== 'undefined') {
        useSocketMap[userId] = socket.id; // Correct assignment   
    }


    // io emit is used to send events to all the connected users
    io.emit('GetOnlineUser', Object.keys(useSocketMap))
    // socket.on() on is used To listen the event . can be used in client and server side both
    socket.on("disconnect", () => {
        console.log('user disconnected!!', socket.id);
        delete useSocketMap[userId]
        io.emit('GetOnlineUser', Object.keys(useSocketMap))
    })
})
export { app, io, server }