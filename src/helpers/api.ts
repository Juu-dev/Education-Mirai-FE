import axios from "axios";

const client = axios.create({ timeout: 60000 });

const baseUrl = 'http://localhost:9001/api/v1'

// TODO: Replace with logic get authentication token
function getAuthToken() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhNjM0MzIzLThlZDAtNGQ0OS04ZGEyLTVhNjcyZWNjNTE3MiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MzA2NDk5OTcsImV4cCI6MTczMDY1MDg5N30.LEDuOyQF8nLLKAPlYfF4mMzizq6khuoxlGztaoES2Vw'

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
