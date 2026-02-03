import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:5000', // Fallback
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // TODO: Replace with actual token retrieval logic from your auth store
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle global errors here (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - redirecting to login...'); 
            redirect("/");
        }
        return Promise.reject(error);
    }
);

// Generic API Client methods
const ApiClient = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.get<T>(url, config).then((response) => response.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.post<T>(url, data, config).then((response) => response.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.put<T>(url, data, config).then((response) => response.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.patch<T>(url, data, config).then((response) => response.data),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.delete<T>(url, config).then((response) => response.data),
};

export default ApiClient;
