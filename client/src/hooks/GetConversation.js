import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const GetConversation = () => {
    const [Loading, setloading] = useState(false);
    const [conversation, setconversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setloading(true);
            try {
                const resp = await axios.get('http://localhost:8000/api/user', {
                    withCredentials: true
                });

                if (!resp.data) {
                    throw new Error('Error in fetching');
                }
            
             
                // Assuming resp.data is either an array or object
                if (Array.isArray(resp.data)) {
                    setconversation(resp.data);
                } else {
                    // If resp.data is an object or non-array, handle accordingly
                    console.log('Received non-array data from API');
                    setconversation([resp.data]); // Convert to array if needed
                }

            } catch (error) {
                toast.error(error.message);

            } finally {
                setloading(false);
            }
        };

        getConversation();
    }, []);



    return { Loading, conversation };
};

export default GetConversation;
