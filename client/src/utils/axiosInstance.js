import axios from "axios"
const axiosInstance = axios.create({
    baseURL : "https://doczyserver.vercel.app/api"
})
export default axiosInstance