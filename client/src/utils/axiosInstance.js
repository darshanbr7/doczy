import axios from "axios"
const axiosInstance = axios.create({
    baseURL : "http://localhost:3007/api"
})
export default axiosInstance

/* 
https://doczyserver.vercel.app/api
*/