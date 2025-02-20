import axios from "axios"
const axiosInstance = axios.create({
    baseURL : "https://doczy-server.vercel.app"
})
export default axiosInstance