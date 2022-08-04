import axios from "axios";

const token = localStorage.getItem('token')
axios.defaults.headers.post['Authorization'] = token


const commentsApi =  axios.create({
    baseURL : `${process.env.REACT_APP_URL}/comments`
})

commentsApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = token
    return config;
});

export default commentsApi