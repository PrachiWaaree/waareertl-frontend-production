import axios from "axios";

const SERVER_URL = process.env.API_URL;
const PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

const isServer = typeof window === "undefined";

const axiosInstance = axios.create({
    baseURL: (isServer ? (SERVER_URL || PUBLIC_SERVER_URL) : (PUBLIC_SERVER_URL || SERVER_URL)) + "/api",
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    return config;
});

axiosInstance.interceptors.response.use(async (config) => {
    return config;
});

export { axiosInstance as axios };
