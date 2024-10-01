import axios from "axios";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Authcontext";




const UseLogin = () => {
    const { AuthUser, setAuthUser } = useContext(AuthContext)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()


    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password })
        if (!success) return;
        setloading(true)
        try {

            const response = await axios.post('http://localhost:8000/api/auth/login', { username, password }, {
                withCredentials: true // Include credentials (cookies) with the request
            })

            if (response.error) {
                throw new Error(error.response.data.error)
            }


            // Store response data in local storage
            localStorage.setItem('chat-user', JSON.stringify(response.data));
            setAuthUser(response.data)
            navigate('/')
            toast.success('logged in successfully');
        } catch (error) {



            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }
    return { loading, login }

}

export default UseLogin

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error('please fill the form')
        return false
    }
    return true
}