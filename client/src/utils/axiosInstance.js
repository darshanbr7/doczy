import axios from "axios"
const axiosInstance = axios.create({
    baseURL : "https://doczy-server.vercel.app/api"
})
export default axiosInstance