import mongoose from "mongoose";


const ConversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persons"
    }
  ],
  messages: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
    default: []
  }
]
 
}, { timestamps: true })

const Conversation = mongoose.model("conversations", ConversationSchema)

export default Conversation