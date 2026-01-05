import axios from 'axios'
import { url } from '../constants/BackendUrl'
export const axiosInstance = axios.create({
    baseURL: url.endsWith('/') ? url : `${url}/`,
    withCredentials: true
})