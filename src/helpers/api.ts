import axios from "axios";
import tokenFactory from "./token";

const client = axios.create({ timeout: 60000 });

const baseUrl = 'http://localhost:9001/api/v1'

function createApi() {
    return async (
        uri: string,
        options: {
            headers?: any;
            body?: any;
            method?: "GET" | "POST" | "PUT" | "DELETE";
        } = {},
        auth: boolean = true
    ) => {
        if (options.body) {
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
        });

        return response.data;
    };
}

export const api = createApi();
