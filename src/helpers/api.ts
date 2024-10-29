import axios from "axios";

const client = axios.create({ timeout: 60000 });

const baseUrl = 'http://localhost:8080/api'

// TODO: Replace with logic get authentication token
function getAuthToken() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaGV2MiIsInVzZXJJZCI6IjQ1ZDE5ZmI5LTNkYzktNGZkYi05ZjhjLTAwMDFlOWViYzY2ZSIsImlhdCI6MTczMDIxMDIwNSwiZXhwIjoxNzMwMjk2NjA1fQ.17kAzowJf8ftwoZ38uJEjHjqPZjZSlE5kDyZXo_ntRU'

    return token;

    // return localStorage.getItem("token");
}

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
            const token = getAuthToken();
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
