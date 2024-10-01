import React, { useContext } from 'react'
import AuthContext from '../../context/Authcontext'
import useConversation from '../../zustand/useConversation'
import ExtractedTime from '../../hooks/ExtractedTime'


const MessageComponent = ({ message }) => {

    const { AuthUser } = useContext(AuthContext)
    const { selectedConversation } = useConversation()
    const FormMe = message?.senderId === AuthUser?._id
    const ProfilePicture = FormMe ? AuthUser?.profilePic : selectedConversation?.profilePic
    const ChatClassname = FormMe ? "chat-end" : "chat-start"
    const ChatColor = FormMe ? "bg-[#9599E2]" : "bg-[#8BC6EC]"
    const FromattedTime = ExtractedTime(message?.createdAt)
    const ShakeClass = message.shouldshake ? "shake" : ''
    return (
        <div className=''>

            <div className={`chat ${ChatClassname}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={ProfilePicture} />
                    </div>
                </div>
                <div className="chat-header">

                    <time className="text-xs opacity-50">{FromattedTime}</time>
                </div>
                <div className={`chat-bubble ${ChatColor} ${ShakeClass} text-black font-medium`} >{message?.message}</div>

            </div>

        </div >
    )
}

export default MessageComponent