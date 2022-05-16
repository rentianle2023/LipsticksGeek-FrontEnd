import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/users`
})

// const CancelToken = axios.CancelToken;

axiosInstance.interceptors.request.use((config) => {
    // add token to request headers
    const token = localStorage.getItem('token')
    // if(config.url !== "/register" && !token){
    //     return {
    //         ...config,
    //         cancelToken: new CancelToken((cancel) => cancel('Cancel 403 request'))
    //     }
    // }
    config.headers['Authorization'] = token
    return config;
});

export default axiosInstance