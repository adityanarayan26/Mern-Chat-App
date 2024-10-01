import axios from "axios"
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"


const GetMessage = () => {
    const [loading, setloading] = useState(false)
    const { messages, setmessages, selectedConversation } = useConversation()
    useEffect(() => {
        const getmessage = async () => {
            setloading(true)
            try {


                const resp = await axios.get(`http://localhost:8000/api/messages/${selectedConversation?._id}`, {
                    withCredentials: true
                })
                if (resp.error) {
                    throw new Error(error.message)
                }
                if (Array.isArray(resp.data)) {
                    setmessages(resp.data)
                   
                    return ;
                }
                else {
                  
                    setmessages([resp.data])
                    return;
                }
            } catch (error) {
                toast.error(error.message)
                console.log(error.message)
            } finally {
                setloading(false)
            }
        }
        if (selectedConversation?._id) { getmessage() }
    }, [selectedConversation._id, setmessages])
    return { loading, messages }

}

export default GetMessage