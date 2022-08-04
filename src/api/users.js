import axios from "axios";

const userApi = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/users`
})

// const CancelToken = axios.CancelToken;

userApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = token
    return config;
});

export default userApi