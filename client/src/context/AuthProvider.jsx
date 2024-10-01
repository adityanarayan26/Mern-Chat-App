import React, { useState } from 'react'
import AuthContext from './Authcontext.js'

const AuthProvider = ({ children }) => {
    const [AuthUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null)
    return (
        <AuthContext.Provider value={{ AuthUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider