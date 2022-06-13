import axios from "axios";

const token = localStorage.getItem('token')
axios.defaults.headers.post['Authorization'] = token


export default axios.create({
    baseURL : `${process.env.REACT_APP_URL}/comments`
})