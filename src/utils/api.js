import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:7004",
    // withCredentials: true,
});

export default API;
