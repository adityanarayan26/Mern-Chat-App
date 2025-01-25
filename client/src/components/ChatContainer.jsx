import React, { useEffect, useState } from 'react'
import { useChat } from '../store/useChat'
import { Zustand } from '../store/Zustand'

const ChatContainer = () => {
    const { selectedUser, messages, getMessages, subscribeTonewMessage, UnsubscribeTonewMessage } = useChat()
    const { authUser } = Zustand()
    const messageRef = React.useRef(null)

    useEffect(() => {
        getMessages(selectedUser._id)
        subscribeTonewMessage()
        return () => {
            UnsubscribeTonewMessage()
        }

    }, [getMessages, selectedUser._id])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [messageRef.current, messages])

    function formatTo12HourTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',

            hour12: true,
        });
    }

    return (
        <div className='w-full  py-2 h-[94%]  overflow-y-scroll text-base-content px-3' ref={messageRef}>

            {messages?.map((item) => (
                <>

                    <div key={item._id} className={`chat ${item.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="profile"
                                    src={item.senderId === authUser._id ? authUser?.profilePic || '/avatar.png' : selectedUser?.profilePic || '/avatar.png'} />
                            </div>
                        </div>
                        <div className="chat-header flex gap-x-2 ">
                            {item.senderId === authUser._id ? authUser?.fullName : selectedUser?.fullName}
                            <time className="text-xs opacity-50">{formatTo12HourTime(item.createdAt)}</time>
                        </div>
                        <div className="chat-bubble">
                            {item.image && <img src={item.image} alt="chat" className="w-40 h-40 object-cover" />}

                            {item.text && <p>{item.text}</p>}

                        </div>
                        <div className="chat-footer opacity-50">Delivered</div>

                    </div>
                </>
            ))}




        </div>
    )
}

export default ChatContainer