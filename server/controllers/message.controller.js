import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import cloudinary from '../lib/cloudinary.js'
import { io, ReceiverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUser)
    } catch (error) {
        console.error("error in getUsersForSidebar", error.message);
        res.status(500).json({ message: 'internal server error' })
    }
}
export const getMessages = async (req,res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id
        const messages = await Message.find({ $or: [{ senderId: myId, receiverId: userToChatId }, { senderId: userToChatId, receiverId: myId }] })

        res.status(200).json(messages)
    } catch (error) {
        console.error("error in getMessages", error.message);
        res.status(500).json({ message: 'internal server error' })
    }
}
export const sendMessages = async (req,res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let imgUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imgUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        })
        await newMessage.save()

const ReceiverId = ReceiverSocketId(receiverId)
if(ReceiverId){
    io.to(ReceiverId).emit("newMessage",newMessage)
}


        res.status(201).json(newMessage)
    } catch (error) {
        console.error("error in sendMessages", error.message);
        res.status(500).json({ message: 'internal server error' })
    }
}