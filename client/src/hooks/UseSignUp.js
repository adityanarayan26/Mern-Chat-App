import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"




const UseSignUp = () => {
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const signUp = async ({ fullname, username, gender, password, confirmpassword }) => {

        const success = handleInputError({ fullname, username, gender, password, confirmpassword })
        if (!success) return;
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', { fullname, username, gender, password, confirmpassword })


            if (response.error) {
                throw new Error(response.error);
            }
            // // local storage 
            // localStorage.setItem('chat-user', JSON.stringify(response.data));

            // // context 
            // setAuthUser(response.data);
       
            toast.success('registered successfully');
            navigate('/login')

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    };

    return { Loading, signUp };
}

export default UseSignUp


const handleInputError = ({ fullname, username, gender, password, confirmpassword }) => {
    if (!fullname || !username || !gender || !password || !confirmpassword) {
        toast.error('please fill the form')
        return false;
    }
    if (password !== confirmpassword) {
        toast.error('password do not match')
        return false
    }
    if (password.length < 6) {
        toast.error('password must be at least 6 characters')
        return false
    }

    return true

}
