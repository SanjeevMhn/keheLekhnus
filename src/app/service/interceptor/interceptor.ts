'use client'
import { setNewToken } from "@/app/lib/auth/authSlice";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

let store: any;

export const injectStore = (_store: any) => {
    store = _store;
}

const api: AxiosInstance = axios.create();

api.interceptors.request.use(
    (config: any | AxiosRequestConfig) => {
        const accessToken = store.getState().auth.user_token;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response && error.response.status == 401) {
            let gToken = sessionStorage.getItem('google-token');
            if ( gToken !== null) {
                store.dispatch(setNewToken(gToken));
                error.config.headers.Authorization = `Bearer ${gToken}`;
                const response = await axios(error.config);
                return response;
            } else {
                try {
                    const refreshTokenConfig: AxiosRequestConfig = {
                        url: 'http://localhost:8080/api/v1/refresh',
                        method: 'post',
                        withCredentials: true
                    }
                    const newTokenRes = await axios(refreshTokenConfig);
                    const newToken = await newTokenRes.data.accessToken;
                    store.dispatch(setNewToken(newToken))
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    const response = await axios(error.config);
                    return response;
                } catch (refreshError) {
                    throw refreshError;
                }
            }
        }
    }
)

export default api;
