import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import { url } from '../constants/BackendUrl';
import { io } from 'socket.io-client'

export const Zustand = create((set, get) => ({

    authUser: null,
    isSignup: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isUpdatingCredentials:false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('api/auth/check')
            set({ authUser: response.data })
        get().ConnectSocket()


        } catch (error) {
            console.log('error in checkauth', error.message);

            set({ authUser: null })

        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSignup: true })
        try {
            const { fullName, email, password } = data
            const response = await axiosInstance.post('/api/auth/signup', { fullName, email, password })
            set({ authUser: response.data })
            get().ConnectSocket()
            toast.success('signup successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } catch (error) {

            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            console.log(error);

        } finally {
            set({ isSignup: false })
        }
    },
    login: async (data) => {
        set({ isSignup: true })
        try {
            const { email, password } = data
            const response = await axiosInstance.post('/api/auth/login', { email, password })
            set({ authUser: response.data })
            get().ConnectSocket()
            toast.success('login successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } finally {
            set({ isSignup: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/api/auth/logout')
            set({ authUser: null })
            get().DisconnectSocket()
            toast.success('logout successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
    },
    UploadProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const response = await axiosInstance.put('/api/auth/update-profile', data)
            set({ authUser: response.data })
            toast.success('profile updated successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    UpdateFullNameandEmail: async (data) => {
        set({ isUpdatingCredentials: true })
        try {
            const {fullName,password} = data
            const res = await axiosInstance.put('/api/auth/update-credentials', {fullName,password})
            set({ authUser: res.data })
            toast.success('profile updated successfully', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
        finally{
            set({ isUpdatingCredentials: false})
        }
    }
    ,
    ConnectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;

        const socket = io(url, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({ socket: socket })

        socket.on("GetOnlineUsers", (userId) => {
            set({ onlineUsers: userId })
        })
    },
    DisconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))