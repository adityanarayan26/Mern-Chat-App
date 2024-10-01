import { Loader, LogOut, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import UseLogout from '../../hooks/UseLogout.js'
import useConversation from '../../zustand/useConversation.js'
import GetConversation from '../../hooks/GetConversation.js'
import toast from 'react-hot-toast'
import { dotPulse } from 'ldrs'

import UserShow from './UserShow.jsx'

dotPulse.register()


const SideBar = ({ setsidebarOpen, sidebarOpen }) => {


    const { loading, logout } = UseLogout()


    const { Loading, conversation } = GetConversation()

    const { setselectedConversation, selectedConversation } = useConversation()
    const [SearchInput, setSearchInput] = useState('')
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            handleSubmit(event); // Call the form's submit handler
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault()

        if (SearchInput === "") {
            toast.error('Search field cannot be empty. Please enter a term to proceed.')
            return;
        }

        if (SearchInput.length < 3) {
            toast.error('Search term must be at least 3 characters long. Please refine your input.')
            return;
        }

        const convo = conversation.find((c) => c.fullname.toLowerCase().includes(SearchInput.toLowerCase()))
        if (convo) {
            setselectedConversation(convo);
            setSearchInput("");
            return;
        }

        else { toast.error('No such user found!') }
    }
    return (
        <div className={` h-full z-50 fixed backdrop-filter backdrop-blur-lg bg-opacity-0 
 md:relative  overflow-y-scroll  transition-all ease duration-200     ${sidebarOpen ? 'w-full md:w-[32rem] ' : 'w-0 border-none'}  `}>
            <X className={`size-8 text-zinc-50 absolute top-5  left-2 cursor-pointer ${sidebarOpen ? 'visible' : 'invisible'}`} onClick={() => setsidebarOpen(!sidebarOpen)} />
            <div className='w-full text-right pr-5 pt-5 flex justify-end'>
                {loading ? <Loader /> : <LogOut className='w-7 h-7  text-red-700 cursor-pointer' onClick={logout} />}
            </div>

            <div className='w-full h-full flex flex-col justify-start items-center py-5'>
                <form onSubmit={handleSubmit} className="w-[90%] p-3  flex justify-between items-center rounded-xl bg-zinc-50">
                    <input
                        type="text"
                        className="bg-transparent w-full border-none outline-none pl-1 h-full text-black"
                        placeholder="Search"
                        onKeyDown={handleKeyPress}
                        value={SearchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type='submit'>
                        <Search className='cursor-pointer' />
                    </button>
                </form >
                {!selectedConversation && <p className='text-sm font-bold md:hidden block text-rose-700 py-2 lowercase animate-pulse'>Select a user to chat with</p>}
                <div className='mt-8 w-full px-5 pb-10'>
                    {Loading ?
                        <div className='w-full text-center'>
                            <l-dot-pulse
                                size="43"
                                speed="1.3"
                                color="black"
                            ></l-dot-pulse>
                        </div>

                        :

                        <div>
                            {conversation?.map((Convo) =>

                                (<UserShow key={Convo._id} Convo={Convo} setsidebarOpen={setsidebarOpen} sidebarOpen={sidebarOpen} />)
                            )}


                        </div>

                    }

                </div>
            </div>

        </div >
    )
}

export default SideBar