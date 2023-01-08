import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3023/" });

API.interceptors.request.use(config => {
    if (localStorage.getItem("user")) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
    return config
});


export default API;