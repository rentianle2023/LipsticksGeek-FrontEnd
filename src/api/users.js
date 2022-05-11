import axios from "axios";

const axiosInstance =  axios.create({
    baseURL : 'http://192.168.101.19:8080/users'
})

axiosInstance.interceptors.request.use((config) => {
    // add token to request headers
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  });

  export default axiosInstance