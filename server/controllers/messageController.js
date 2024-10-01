import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import { io, ReceiverId } from "../socket/socket.js";



export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation?.messages?.push(newMessage._id);
        }

        //the second code will run until first gets executed
        // await conversation.save() //2second
        // await newMessage.save()// wait 2second to be run

        //this will run both parallelly means same time


        await Promise.all([conversation.save(), newMessage.save()])

        // socket io implementation
        const receiverSocketId = ReceiverId(receiverId)

        if (receiverSocketId) {
            // io.to(<senderid>).emit() send event to specific user
              io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log(error);

    }

}

export const getMessage = async (req, res) => {
    try {

        const { id: UserToChatId } = req.params
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, UserToChatId] }
        }).populate('messages')
        if (!conversation) {
            return res.status(200).json([])
        }
        const messages = conversation.messages
        return res.status(200).json(messages)
    } catch (error) {
        console.log('error in getting message');
        return res.status(500).json({
            message: 'error in getting message',
        })
    }
}