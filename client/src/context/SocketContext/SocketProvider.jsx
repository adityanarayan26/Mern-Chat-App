import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthContext from '../Authcontext'
import io from 'socket.io-client'




const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}


const SocketProvider = ({ children }) => {
    const [Socket, setSocket] = useState(null)
    const [OnlineUsers, setOnlineUsers] = useState([])
    const { AuthUser } = useContext(AuthContext)


    useEffect(() => {
        if (AuthUser) {
            const socket = io('http://localhost:8000', {
                query: {
                    userId: AuthUser?._id
                }
            })
            setSocket(socket)

    


            // socket.on() on is used To listen the event . can be used in client and server side both
            socket.on('GetOnlineUser', (users) => {
                setOnlineUsers(users)
          

            })


            return () =>socket.close()
        }
        else {
            if (Socket) {
                Socket.close()
                setSocket(null)
            }
        }
    }, [AuthUser])

    return (
        <SocketContext.Provider value={{ Socket, OnlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider