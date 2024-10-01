import React, { useContext, useEffect, useRef, useState } from 'react'
import GetMessage from '../../hooks/GetMessage'
import SkeletonMessage from '../SkeletonMessage'
import MessageComponent from './MessageComponent'
import './style.css'
import useListenMessage from '../../hooks/useListenMessage'
import AuthContext from '../../context/Authcontext'

const Message = ({Wallpaper}) => {

    const { messages, loading } = GetMessage()
    const { AuthUser, setAuthUser } = useContext(AuthContext)
    useListenMessage()
    const MessageScroll = useRef(null)
    useEffect(() => {
        setTimeout(() => {

            MessageScroll.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100);

    }, [messages])

    

    return (

        <div className='h-full w-full mt-[4rem] overflow-y-scroll py-20 md:px-10 px-3 bg-zinc-800 relative transition-all ease-linear duration-200' style={{ backgroundImage: `url(${Wallpaper})`, objectFit: 'cover', objectPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            {
                !loading && messages?.length > 0 && messages?.map((message) => (
                    <div ref={MessageScroll}>

                        <MessageComponent key={message.id} message={message} />
                    </div>
                ))
            }

            {
                loading &&
                <SkeletonMessage />
            }
            {!loading && messages?.length === 0 &&
                <p className='text-xl text-white font-semibold capitalize'>Send a message to start a conversation 😄</p>
            }


        </div>



    )
}
export default Message