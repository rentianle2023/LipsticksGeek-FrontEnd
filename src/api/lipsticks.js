import axios from "axios";

const lipsticksApi =  axios.create({
    baseURL : `${process.env.REACT_APP_URL}/lipsticks`
})

lipsticksApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = token
    return config;
});

export default lipsticksApi

