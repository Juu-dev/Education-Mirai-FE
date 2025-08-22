/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import tokenFactory from "./token";
import { API_URL } from "./env";
import { refreshTokenPath } from "./api-params/auth";
// =======================
// Axios Client
// =======================
const client = axios.create({ timeout: 60000 });
let isRefreshing = false;
let failedQueue = [];
// =======================
// Helpers
// =======================
const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        }
        else if (token) {
            resolve(token);
        }
    });
    failedQueue = [];
};
// =======================
// Response Interceptor
// =======================
client.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            // Nếu đang refresh -> đẩy request vào hàng đợi
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        }
                        resolve(client(originalRequest));
                    },
                    reject,
                });
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;
        try {
            const { data } = await client.post(refreshTokenPath.url, {}, { withCredentials: refreshTokenPath.isWithCredentials });
            const newAccessToken = data.accessToken;
            tokenFactory.setAccessToken(newAccessToken);
            processQueue(null, newAccessToken);
            if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            }
            return client(originalRequest);
        }
        catch (err) {
            processQueue(err, null);
            tokenFactory.removeAccessToken();
            window.location.href = "/";
            return Promise.reject(err);
        }
        finally {
            isRefreshing = false;
        }
    }
    return Promise.reject(error);
});
function createApi() {
    return async (uri, { headers = {}, body, method = "GET" } = {}, auth = true, withCredentials = false) => {
        let requestBody = body;
        if (body instanceof FormData) {
            // Let browser set correct Content-Type
        }
        else if (body) {
            requestBody = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }
        if (auth) {
            const token = tokenFactory.getAccessToken();
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }
        const response = await client.request({
            url: `${API_URL}${uri}`,
            method,
            data: requestBody,
            headers: {
                accept: "application/json",
                ...headers,
            },
            withCredentials,
        });
        return response.data;
    };
}
export const api = createApi();
