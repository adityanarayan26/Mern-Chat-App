import React, { useEffect } from 'react'
import { useChat } from '../store/useChat'
import { Loader2 } from 'lucide-react'
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
        <div className='w-full py-4 h-[94%] overflow-y-scroll px-4' ref={messageRef}>
            <div className="space-y-4">
                {messages?.map((item, index) => (
                    <div
                        key={item._id}
                        className={`flex w-full animate-fade-in ${item.senderId === authUser._id ? 'justify-end' : 'justify-start'} ${item.status === 'sending' ? 'opacity-50' : ''}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={`flex max-w-[75%] md:max-w-[60%] gap-2.5 ${item.senderId === authUser._id ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="shrink-0">
                                <img
                                    alt="profile"
                                    className="size-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                                    src={item.senderId === authUser._id ? authUser?.profilePic || '/avatar.png' : selectedUser?.profilePic || '/avatar.png'}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className={`px-4 py-2.5 rounded-2xl relative ${item.senderId === authUser._id
                                    ? 'gradient-bubble text-white rounded-br-sm shadow-lg shadow-blue-500/20'
                                    : 'bg-white text-gray-800 rounded-bl-sm shadow-md border border-gray-100'
                                    }`}>
                                    {item.image &&
                                        <div className="mb-2 rounded-xl overflow-hidden">
                                            <img src={item.image} alt="chat" className="w-full h-auto max-h-64 object-cover" />
                                        </div>
                                    }
                                    {item.text && <p className="leading-relaxed text-[15px]">{item.text}</p>}
                                </div>
                                <span className={`text-[10px] text-gray-400 font-medium px-1 ${item.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                                    {formatTo12HourTime(item.createdAt)}
                                </span>
                                {item.status === 'sending' && (
                                    <div className="absolute -left-5 bottom-1">
                                        <Loader2 size={14} className="animate-spin text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatContainer