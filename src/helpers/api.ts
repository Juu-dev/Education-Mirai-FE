import axios from "axios";

const client = axios.create({ timeout: 60000 });

// TODO: Replace with logic get authentication token
function getAuthToken() {
    return localStorage.getItem("token");
}

function createApi() {
    return async (
        uri: string,
        options: {
            headers?: any;
            body?: any;
            method?: "GET" | "POST" | "PUT" | "DELETE";
            auth?: boolean;
        } = {}
    ) => {
        if (options.body) {
            options.body = JSON.stringify(options.body);
            options.headers = options.headers || {};
            options.headers["Content-Type"] = "application/json";
        }

        if (options.auth) {
            const token = getAuthToken();
            if (token) {
                options.headers = options.headers || {};
                options.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const response = await client.request({
            url: uri,
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
