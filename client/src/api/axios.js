import axiosInstance from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURL = "http://localhost:5000/api/";
const token = cookies.get('pantherAuth') ? cookies.get('pantherAuth'): null;
console.log(token);

const axios = axiosInstance.create({
    baseURL,
    timeout: 30000,
    headers: {'Authorization': token},
})

export default axios

