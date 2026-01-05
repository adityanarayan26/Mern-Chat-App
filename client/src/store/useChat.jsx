import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Zustand } from "./Zustand";

export const useChat = create((set, get) => ({
    selectedUser: localStorage.getItem('selectedUser') ? JSON.parse(localStorage.getItem('selectedUser')) : null,
    messages: [],
    users: [],
    isMessagesSending: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/users')
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },
    getMessages: async (id) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${id}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },
    setSelectedUser: (selectedUser) => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser))
        set({ selectedUser })
    },
    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get()
        set({ isMessagesSending: true })

        // Optimistic Update
        const tempId = `temp-${Date.now()}`;
        const authUser = Zustand.getState().authUser;
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image, // Use the base64 preview
            createdAt: new Date().toISOString(),
            status: "sending"
        };

        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData)
            // Replace optimisitic message with real one
            set((state) => ({
                messages: state.messages.map(msg => msg._id === tempId ? res.data : msg)
            }))

        } catch (error) {
            // Remove optimistic message on error
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== tempId)
            }))
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesSending: false })
        }
    },
    subscribeTonewMessage: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;
        const socket = Zustand.getState().socket

        socket.on('newMessage', (message) => {
            if (message.senderId !== selectedUser._id) return;
            set({ messages: [...get().messages, message] })
        })
    },
    UnsubscribeTonewMessage: () => {
        const socket = Zustand.getState().socket
        socket.off('newMessage')
    }

}))