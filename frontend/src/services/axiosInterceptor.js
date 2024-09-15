import axios from "axios";

const basePath = `${process.env.REACT_APP_API_BASE_URL}/api`;

const axiosInstance = axios.create({
    baseURL: `${basePath}`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("authToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
