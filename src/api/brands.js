import axios from "axios";

export default axios.create({
    baseURL : 'http://192.168.101.19:8080/brands'
})