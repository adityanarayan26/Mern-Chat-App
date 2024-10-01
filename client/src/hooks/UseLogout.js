import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/Authcontext"



const UseLogout = () => {
    const { AuthUser, setAuthUser } = useContext(AuthContext)
    const [loading, setloading] = useState(null)
    const navigate = useNavigate()
    const logout = async () => {

        setloading(true)
        try {
            const response = await axios.post('http://localhost:8000/api/auth/logout', {}, {
                withCredentials: true // Include credentials (cookies) with the request
            })
            if (response.error) {
                throw new Error('response undefined');
            }

            localStorage.removeItem('chat-user');
            setAuthUser(null)
            navigate('/login')
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setloading(false)
        }
    }



    return { loading, logout }
}

export default UseLogout
