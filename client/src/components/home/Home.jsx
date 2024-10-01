import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from '../sidebar/SideBar'
import { Menu, Send, Settings, Smile } from 'lucide-react';
import Message from '../Message/Message';
import useConversation from '../../zustand/useConversation';
import SendMessage from '../../hooks/SendMessage';
import { ping } from 'ldrs'
import AuthContext from '../../context/Authcontext';
import EmojiPicker from 'emoji-picker-react';
import { wallpaperAPI } from '../../wallpapers/wallpaperAPI';


ping.register()

const Home = () => {
    const [MessageInput, setMessageInput] = useState()
    const { AuthUser, setAuthUser } = useContext(AuthContext)
    const { loading, sendMessage } = SendMessage()
    const { selectedConversation, setselectedConversation } = useConversation()

    const handleEmojiClick = (emojiObject) => {
        setMessageInput((prevMessage) => prevMessage ? (prevMessage + emojiObject.emoji) : emojiObject.emoji);

        setEmoji(false);
    };


    const handleSubmitMessageInput = async (e) => {
        e.preventDefault()
        if (!MessageInput) return;
        await sendMessage(MessageInput)
        setMessageInput('')
    }
    const menubar = useRef(null)
    const handleClick = () => {
        setsidebarOpen(!sidebarOpen)
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            handleSubmitMessageInput(event); // Call the form's submit handler
        }
    }
    const [sidebarOpen, setsidebarOpen] = useState(true)
    const [Emoji, setEmoji] = useState(false)
    const [EmojiInput, setEmojiInput] = useState('')
    const [Wallpaper, setWallpaper] = useState('')

    useEffect(() => {
        setWallpaper(AuthUser?.wallpaper)
    }, [AuthUser?.wallpaper])



    const handleWallpaperChange = (event) => {
        const selectedSrc = event.target.value;

        localStorage.setItem('chat-user', JSON.stringify({ ...AuthUser, wallpaper: selectedSrc }))
        setAuthUser({ ...AuthUser, wallpaper: selectedSrc });
    };
    return (
        <div className='h-full w-full flex bg-zinc-800'>

            <SideBar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen} />
            <div className='h-full w-full flex flex-col relative'>

                {selectedConversation ? <div className={`w-full  h-[5rem] fixed top-0  z-[40]  flex justify-between items-center pl-3 pr-10  ${AuthUser.wallpaper ? "bg-clip-padding backdrop-filter backdrop-blur-xl" : "bg-gradient-to-r from-primary to-indigo-500"}  transition-all ease-linear duration-200`}>
                    <div className='flex items-center justify-between'>
                        <Menu ref={menubar} className={`size-7  text-zinc-50   cursor-pointer   ${sidebarOpen ? 'invisible' : 'visible'}`} onClick={handleClick} />

                        {selectedConversation && <div className='text-xl  text-white font-medium flex items-center  justify-center'>
                            <img src={selectedConversation?.profilePic} className='w-14 h-14 mx-2' alt="" />
                            <h1 className='font-bold capitalize'>{selectedConversation?.fullname}</h1>

                        </div>}
                    </div>
                    <div>

                        <select onChange={handleWallpaperChange} className="select outline-none md:w-full w-20 bg-white text-black">
                            <option disabled selected>Select wallpaper</option>
                            {
                                wallpaperAPI && wallpaperAPI?.map((item) =>
                                (
                                    < >
                                        <option key={item.id} value={item.src}>{item.name}</option>
                                    </>

                                )
                                )
                            }
                        </select>
                    </div>
                </div> : <div className='w-full  h-[5rem] fixed top-0  z-[40]  flex justify-between items-center pl-3 pr-10 bg-gradient-to-r from-primary to-indigo-500'></div>}
                <div className='md:h-[93%] h-[90%]  z-[8] w-full' >
                    {selectedConversation ? <Message Wallpaper={Wallpaper} /> :
                        <div className='h-full w-full mt-[4rem] bg-gradient-to-r from-primary to-indigo-500  flex flex-col justify-center items-center text-white'>
                            <h1 className='text-xl md:text-3xl font-bold capitalize '>Welcome <span className='text-rose-700 '>{AuthUser?.fullname}</span>  to ChatApp🥰</h1>
                            <h2 className='text-2xl font-medium animate-pulse'>Select a user to chat with...</h2>
                        </div>
                    }
                </div>
                <div className='h-fit z-[20] md:static absolute bottom-0  w-full flex items-center
                justify-center '>

                    {selectedConversation && <div className=" bg-zinc-50  size-12 px-3 md:rounded-xl flex items-center justify-between  w-full  md:mx-8 relative ">
                        <div className='absolute bottom-14 z-[999] '>
                            <EmojiPicker open={Emoji} className='' onEmojiClick={handleEmojiClick} />
                        </div>
                        <Smile className='mr-3 cursor-pointer ' onClick={() => setEmoji(!Emoji)} />

                        <input type="text" value={MessageInput}
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setMessageInput(e.target.value)} placeholder='Send message'
                            className="bg-transparent w-full outline-none text-black font-normal " />

                        {loading ?
                            <div className='flex items-center justify-center'>
                                <l-ping
                                    size="35"
                                    speed="2"
                                    color="white"
                                ></l-ping>
                            </div>
                            : <Send className=' cursor-pointer ' onClick={handleSubmitMessageInput} />}
                    </div>}
                </div>
            </div>

        </div >
    )
}

export default Home