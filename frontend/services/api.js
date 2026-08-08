import axios from "axios";

const api = axios.create({
    baseURL: "https://hotshot-488i.onrender.com" || "http://127.0.0.1:8000" ||"http://localhost:8000",
})

export default api;