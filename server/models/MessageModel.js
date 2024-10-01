import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persons",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persons",
        required: true
    },
    message: {
        type: String,
        required: true
    }

    //createdat , updated at
}, { timestamps: true })

const Message = mongoose.model("Messages", MessageSchema)

export default Message