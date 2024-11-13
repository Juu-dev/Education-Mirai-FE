/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import tokenFactory from "./token";

const client = axios.create({ timeout: 60000 });
const baseUrl = 'http://171.244.61.90:9001/api/v1';

function createApi() {
    return async (
        uri: string,
        options: {
            headers?: any;
            body?: any;
            method?: "GET" | "POST" | "PUT" | "DELETE";
        } = {},
        auth: boolean = true,
        withCredentials: boolean = false,
    ) => {
        if (options.body instanceof FormData) {
            // When using FormData, let the browser set the appropriate Content-Type with boundary
            options.headers = options.headers || {};
        } else if (options.body) {
            // For JSON requests, stringify the body and set the Content-Type header
            options.body = JSON.stringify(options.body);
            options.headers = options.headers || {};
            options.headers["Content-Type"] = "application/json";
        }

        if (auth) {
            const token = tokenFactory.getAccessToken();
            if (token) {
                options.headers = options.headers || {};
                options.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        console.log('options: ', options);

        const response = await client.request({
            url: baseUrl + uri,
            method: options.method || "GET",
            data: options.body,
            headers: {
                accept: "application/json",
                ...(options.headers || {}),
            },
            withCredentials: withCredentials,
        });

        return response.data;
    };
}

export const api = createApi();
