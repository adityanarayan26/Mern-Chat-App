import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext/SocketProvider"
import useConversation from "../zustand/useConversation"
import notification from '.././assets/sounds/notification.mp3'

const useListenMessage = () => {
    const { Socket } = useSocketContext()
    const { messages, setmessages } = useConversation()


    useEffect(() => {

        Socket?.on('newMessage', (newMessage) => {
            newMessage.shouldshake = true
            const notificationSound = new Audio(notification)
            notificationSound.play()
            setmessages([...messages, newMessage])

        })
        return () => Socket?.off('newMessage')
    }, [Socket, messages, setmessages])

}

export default useListenMessage