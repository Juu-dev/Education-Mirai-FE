import { useState } from "react";
import useFetchApi from "./useFetchApi";
import * as constants from "node:constants";

interface UsePaginateProps {
    url: string;
    defaultData?: any[];
    initLoad?: boolean;
    presentData?: any;
    defaultLimit?: number;
    defaultSort?: string;
    searchKey?: string;
    initQueries?: Record<string, any>;
}

interface PaginateQueries {
    page: number;
    sort: string;
    limit: number;
    [key: string]: any;
}

export default function usePaginate({
    url,
    defaultData = [],
    initLoad = true,
    presentData = null,
    defaultLimit = 20,
    defaultSort = "createdAt:asc",
    searchKey = "searchKey",
    initQueries = {},
}: UsePaginateProps) {
    const [queries, setQueries] = useState<PaginateQueries>({
        page: 1,
        sort: defaultSort,
        limit: defaultLimit,
        [searchKey]: "",
        ...initQueries,
    });

    const fetchApiHook = useFetchApi({
        url,
        defaultData,
        initLoad,
        presentData,
        initQueries: queries,
    });

    const { data, fetchApi, loading, fetched, setData, setCount } =
        fetchApiHook;

    const handleFetchApi = async (
        params: Partial<PaginateQueries> = {},
        keepData = false
    ) => {
        await fetchApi(url, { ...queries, ...params } as any, keepData as any);
    };

    const onQueryChange = (key: string, value: any, isFetch = false) => {
        setQueries((prev) => ({ ...prev, [key]: value }));
        if (isFetch) handleFetchApi({ [key]: value });
    };

    const onQueriesChange = (
        newQueries: Partial<PaginateQueries>,
        isFetch = false
    ) => {
        setQueries((prev) => ({ ...prev, ...newQueries }));
        if (isFetch) handleFetchApi(newQueries);
    };

    const onPaginate = async (paginate: "prev" | "next" | "") => {
        let newPage = queries.page;
        if (paginate === "prev" && queries.page > 1) {
            newPage = queries.page - 1;
        } else if (paginate === "next") {
            newPage = queries.page + 1;
        }

        await handleFetchApi({ page: newPage });
        setQueries((prev) => ({ ...prev, page: newPage }));
    };

    return {
        prevPage: () => onPaginate("prev"),
        nextPage: () => onPaginate("next"),
        onQueryChange,
        onQueriesChange,
        ...fetchApiHook,
    };
}
