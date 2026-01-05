import React, { useEffect } from 'react'
import { Plus, Image, Smile, Send, Trash, X, Loader2 } from 'lucide-react'
import { useChat } from '../store/useChat'
import EmojiPicker from 'emoji-picker-react';
import { gsap } from 'gsap'
import toast from 'react-hot-toast'

const MessageInput = () => {
    const [imagePreview, setImagePreview] = React.useState(null)
    const imagePreviewRef = React.useRef(null)
    const inputMessageRef = React.useRef(null)
    const [messageInput, setMessageInput] = React.useState('')
    const [menuOpen, setMenuOpen] = React.useState(false)
    const { sendMessages, isMessagesSending } = useChat()
    const [emojiOpen, setEmojiOpen] = React.useState(false)
    const fileInputRef = React.useRef(null)

    useEffect(() => {
        if (menuOpen) {
            gsap.to("#actionMenu", { duration: 0.3, opacity: 1, scale: 1, ease: 'back.out(1.7)' });
        } else {
            gsap.to("#actionMenu", { duration: 0.2, opacity: 0, scale: 0.8, ease: 'power2.in' });
        }
    }, [menuOpen])

    useEffect(() => {
        if (imagePreview) {
            gsap.to(imagePreviewRef.current, { delay: 0.2, duration: 0.4, scale: 1, opacity: 1, ease: 'back.out(1.7)' });
        }
    }, [imagePreview]);

    const handleFileChange = (e) => {
        const maxSize = 10 * 1024 * 1024;
        const file = e.target.files[0]
        if (!file) return
        if (!file.type.startsWith("image/")) {
            toast.error('Please select an image file')
            return
        }
        if (file.size > maxSize) {
            toast.error('File size exceeds 10 MB limit')
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
            setMenuOpen(false)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        gsap.to(imagePreviewRef.current, {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                setImagePreview(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        });
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage()
        }
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() && !imagePreview) return;
        try {
            await sendMessages({ text: messageInput.trim(), image: imagePreview });
            setMessageInput("")
            setImagePreview(null)
            setEmojiOpen(false)
            setMenuOpen(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error) {
            console.log('Error sending message:', error);
        }
    }

    return (
        <div className='w-full text-gray-900 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 relative shadow-lg border border-gray-100'>
            {/* Image Preview */}
            {imagePreview && (
                <div
                    ref={imagePreviewRef}
                    className='absolute -top-24 left-4 scale-0 opacity-0 size-20 bg-white rounded-xl border border-gray-200 shadow-xl p-1.5 overflow-hidden'
                >
                    <img src={imagePreview} alt="preview" className='h-full w-full rounded-lg object-cover' />
                    <button
                        onClick={removeImage}
                        className='absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors'
                    >
                        <X size={12} />
                    </button>
                </div>
            )}

            <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleFileChange} />

            {/* Action Toggle */}
            <button
                onClick={() => { setMenuOpen(!menuOpen); setEmojiOpen(false); }}
                className={`p-2 rounded-xl transition-all duration-200 ${menuOpen ? 'bg-blue-100 text-blue-600 rotate-45' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
                <Plus size={20} />
            </button>

            {/* Action Menu */}
            <div
                id='actionMenu'
                className={`absolute bottom-16 left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex gap-1 opacity-0 scale-90 ${!menuOpen && 'pointer-events-none'}`}
            >
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                >
                    <Image size={18} />
                </button>
                <button
                    onClick={() => { setEmojiOpen(!emojiOpen); }}
                    className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                    <Smile size={18} />
                </button>
            </div>

            {/* Emoji Picker */}
            {emojiOpen && (
                <div className="absolute bottom-20 left-4 z-[6000] shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
                    <div className="relative">
                        <button
                            onClick={() => setEmojiOpen(false)}
                            className="absolute top-2 right-2 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                        >
                            <X size={16} className="text-gray-500" />
                        </button>
                        <EmojiPicker
                            onEmojiClick={(e) => setMessageInput((prev) => prev + e.emoji)}
                            theme="light"
                            width={320}
                            height={400}
                        />
                    </div>
                </div>
            )}

            {/* Text Input */}
            <input
                ref={inputMessageRef}
                type='text'
                className='flex-1 text-sm md:text-base outline-none bg-transparent placeholder:text-gray-400 font-normal'
                placeholder='Type a message...'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {/* Send Button */}
            <button
                onClick={handleSendMessage}
                disabled={(!messageInput.trim() && !imagePreview) || isMessagesSending}
                className={`p-2.5 rounded-xl transition-all duration-200 ${messageInput.trim() || imagePreview
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
            >
                {isMessagesSending ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <Send size={18} />
                )}
            </button>
        </div>
    )
}

export default MessageInput