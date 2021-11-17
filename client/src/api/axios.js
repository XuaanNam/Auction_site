import axiosInstance from "axios";

const baseURL = "http://localhost:5000/api/";
const axios = axiosInstance.create({
    baseURL,
    timeout: 30000,
})

export default axios

