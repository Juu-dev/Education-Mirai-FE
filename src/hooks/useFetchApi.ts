import { useEffect, useState } from "react";
import { api } from "../helpers/api";
import queryString from "query-string";

interface UseFetchApiProps<T> {
    url: string;
    defaultData?: T[];
    initLoad?: boolean;
    presentData?: (data: any) => T[];
    initQueries?: Record<string, any>;
    successCallback?: (data: T[]) => void;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    postData?: any;
    auth?: boolean;
    isWithCredentials?: boolean;
    retryCount?: number;
    retryDelay?: number;
    skipLogBug?: boolean;
}

interface FetchApiParams {
    params?: Record<string, any>;
}

interface Pagination {
    page?: number;
    pageSize?: number;
    totalPage?: number;
}

/**
 * useFetchApi hook for fetching data from API with optional pagination
 * @param {UseFetchApiProps<T>} props - Configuration options for fetching API
 * @returns {Object} - Returns various states and methods to handle API requests
 */
export default function useFetchApi<T>({
    url,
    defaultData = [],
    initLoad = true,
    presentData = (data) => data,
    initQueries = {},
    successCallback = () => {},
    method = "GET",
    postData = {},
    auth = true,
    isWithCredentials = false,
    retryCount = 0,
    retryDelay = 1000,
    skipLogBug = false
}: UseFetchApiProps<T>) {
    const [loading, setLoading] = useState(initLoad);
    const [fetched, setFetched] = useState(false);
    const [data, setData] = useState<T[]>(defaultData);
    const [pagination, setPagination] = useState<Pagination>({});
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const fetchApi = async (
        apiUrl = url,
        { params = {} }: FetchApiParams = {},
        retriesLeft = retryCount
    ) => {
        try {
            setLoading(true);
            const path = apiUrl;
            const separateChar = path.includes("?") ? "&" : "?";
            const query = params
                ? separateChar + queryString.stringify(params)
                : "";

            const options: RequestInit = {
                method,
                ...(method !== "GET" && {
                    body: JSON.stringify(postData),
                    headers: { "Content-Type": "application/json" },
                }),
            };

            const respApi = await api(path + query, options as any, auth, isWithCredentials);
            const resp = respApi.result

            if (resp.hasOwnProperty("count")) {
                setCount(resp.count);
            }

            if (resp.hasOwnProperty("data")) {
                const newData = presentData(resp.data);
                setData(newData);
                successCallback(newData);
            }

            if (resp.pagination) {
                const { total } = resp.pagination;
                setPagination(resp.pagination);
                if (total) {
                    setTotal(total);
                }
            }
        } catch (e: any) {
            if (!skipLogBug) {
                console.error("Error fetching data:", e.message);
                if (retriesLeft > 0) {
                    console.log(`Retrying... (${retriesLeft} retries left)`);
                    setTimeout(() => {
                        fetchApi(apiUrl, { params }, retriesLeft - 1);
                    }, retryDelay);
                } else {
                    console.error("Max retries reached. Could not fetch data.");
                }
            }
        } finally {
            setLoading(false);
            setFetched(true);
        }
    };

    useEffect(() => {
        if (initLoad && !fetched) {
            fetchApi(url, { params: initQueries }).then(() => {});
        }
    }, [initLoad, url, initQueries, fetched]);

    return {
        fetchApi,
        data,
        total,
        setData,
        loading,
        setLoading,
        fetched,
        setFetched,
        pagination,
        setPagination,
        count,
        setCount,
    };
}
