import React from 'react'
import { useSocketContext } from '../../context/SocketContext/SocketProvider'
import useConversation from '../../zustand/useConversation'


const UserShow = ({ Convo,sidebarOpen ,setsidebarOpen}) => {
    const { selectedConversation, setselectedConversation } = useConversation()
    const { OnlineUsers } = useSocketContext()
    const IsSelected = selectedConversation?._id === Convo?._id
    const isOnline = OnlineUsers.includes(Convo?._id)


    return (

        <div key={Convo?.id} className={`w-full flex  justify-between px-4 mb-2 cursor-pointer items-center rounded-lg h-20 transition-all ease duration-200    hover:bg-sky-500 ${IsSelected ? 'bg-sky-500 text-black' : 'bg-zinc-500 text-white'}`} onClick={() => {setselectedConversation(Convo) ,setsidebarOpen(!sidebarOpen)}}>


            <div className='flex items-center gap-x-5'>
                <div className={`avatar ${isOnline ? 'online' : ""} `}>
                    <div className='w-14 rounded-full '>

                        <img src={Convo?.profilePic} alt="" className='' />
                    </div>
                </div>
                <h1 className='capitalize text-lg font-semibold'>{Convo?.fullname}</h1>
            </div>




            <div>

            </div>
        </div>

    )
}
export default UserShow;