import { useState } from "react"
import useConversation from "../zustand/useConversation"
import axios from "axios"
import toast from "react-hot-toast"


const SendMessage = () => {
    const [loading, setloading] = useState(false)
    const { messages, setmessages, selectedConversation } = useConversation()

    const sendMessage = async (message) => {
        setloading(true)
        try {
            const resp = await axios.post(`http://localhost:8000/api/messages/send/${selectedConversation?._id}`, { message }, {
                withCredentials: true
            })
            if (!resp.data) {
                throw new Error(error.message)
            }
            if (!Array.isArray(resp.data)) {
                console.error("messages is not an array");
       
            }

            const data = resp.data
            setmessages([...messages, data])
     

        } catch (error) {
            toast.error(error.message)
            console.log(error);

        }
        finally {
            setloading(false)
        }
    }
    return { loading, sendMessage }
}

export default SendMessage
