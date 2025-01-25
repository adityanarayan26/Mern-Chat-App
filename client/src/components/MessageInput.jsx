import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { CircleX, Cross, Image, Plus, Send, Smile, Trash } from 'lucide-react'
import { useChat } from '../store/useChat'
import { ComboboxDropdownMenu } from './ComboBox'
import EmojiPicker from 'emoji-picker-react';
import { Button } from './ui/button'
import { gsap } from 'gsap'
import toast from 'react-hot-toast'
const MessageInput = () => {
    const [ImagePreview, setImagePreview] = React.useState(null)
    const imagePreviewRef = React.useRef(null)
    const inputMessageRef = React.useRef(null)
    const [MessageInput, setMessageInput] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const { sendMessages } = useChat()
    const [EmojiOpen, setEmojiOpen] = React.useState(false)
    const [SelectedEmoji, setSelectedEmoji] = React.useState(false)
    const emojiContainer = React.useRef(null)
    useEffect(() => {


        open && gsap.to("#Box", { duration: 0.5, opacity: 1, y: -150, opacity: 1, ease: 'power4.out' });
        !open && gsap.to("#Box", { duration: 0.5, opacity: 0, y: 0, ease: 'power4.out' });
    }, [!open, open])


    const fileInputRef = React.useRef(null)
    const handleFileChange = (e) => {
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error('Invalid file type')
            return
        }

        if (file.size > maxSize) {

            toast((t) => (
                <span className='relative'>
                    <h1>File size exceeds the 10 MB limit. Please upload a smaller file.</h1> <br />
                    <p className='font-semibold'>Image Compressor is coming soon...</p>
                    <button className='absolute -top-4 -right-6  text-red-800 ' onClick={() => toast.dismiss(t.id)}>
                        <CircleX />
                    </button>
                </span>
            ));
            return;
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
            setOpen(false)
        }
        reader.readAsDataURL(file)



    }
    useEffect(() => {
        if (ImagePreview) {

            gsap.to(imagePreviewRef.current, { delay: 0.5, duration: 0.5, scale: 1, ease: 'power4.out' });
        }

        if (open) {
            gsap.to(imagePreviewRef.current, { duration: 0.5, x: 70, ease: 'power4.out' });
        }
        if (!open) {
            gsap.to(imagePreviewRef.current, { duration: 0.5, x: 0, ease: 'power4.out' });
        }


    }, [ImagePreview, open]);

    const removeImage = () => {

        setTimeout(() => {
            setImagePreview(null)
        }, 500);
        if (fileInputRef.current) {
            gsap.to(imagePreviewRef.current, { duration: 0.5, scale: 0, ease: 'power4.out' });
            fileInputRef.current.value = ''

        }

    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (!MessageInput.trim() && !ImagePreview) {
                return;
            }

            try {
                await sendMessages({ text: MessageInput.trim(), image: ImagePreview });
                setMessageInput("");
                setImagePreview(null);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    useEffect(() => {
        setOpen(!open)
    }, [EmojiOpen])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!MessageInput.trim() && !ImagePreview) return;
        try {
            await sendMessages({ text: MessageInput.trim(), image: ImagePreview });
            setMessageInput("")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error) {
            console.log('Error sending message:', error);

        }
    }

    return (
        <div className='h-full w-full text-black flex justify-center items-center gap-2 border-none outline-none  bg-base-content rounded-lg px-3 relative'>

            {/* <ComboboxDropdownMenu /> */}
            <div className='relative '>

                {/* <div className='absolute -top-10'>
                    <EmojiPicker open={EmojiOpen} ref={emojiContainer} onEmojiClick={(e) => setMessageInput(e.emoji)} emojiStyle='apple' className=' ' width={300} height={300} lazyLoadEmojis={true} previewConfig={{ showPreview: false }} />

                </div> */}
                {ImagePreview && (


                    <div ref={imagePreviewRef} className='select-none scale-0 size-28 flex absolute  -top-32 -left-3 z-[2000]'>
                        <img src={ImagePreview} alt="preview" className='h-full w-full rounded-md' />
                        <Trash className='text-red-800 size-6 absolute -top-2 z-[5000] -right-2 bg-zinc-800 rounded-full p-1 cursor-pointer' onClick={removeImage} />
                    </div>

                )}
                <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleFileChange} />
                <Plus className={`  transition-all ease-linear duration-200 text-base-300 cursor-pointer ${open ? "rotate-90 " : ""} z-[7000]`} onClick={() => setOpen(!open)} />


                <div id='Box' className={`h-28 w-12 absolute  -left-3 rounded-md bg-white flex flex-col justify-evenly items-center  z-[5000]`}>

                    <Image className="cursor-pointer" onClick={() => fileInputRef.current?.click()} />
                    <Smile className="cursor-pointer" onClick={() => setEmojiOpen(!EmojiOpen)} />
                </div>
            </div>
            <input ref={inputMessageRef} name='text' type='text' className='text-lg outline-none border-none text-white w-full  h-full bg-transparent' placeholder='write a message...'
                value={MessageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <Send className={`  text-base-300 cursor-pointer ${MessageInput === "" ? "cursor-not-allowed" : ""}`} onClick={handleSendMessage} />
        </div >
    )
}

export default MessageInput