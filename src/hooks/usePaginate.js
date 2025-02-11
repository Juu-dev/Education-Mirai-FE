import { useState } from "react";
import useFetchApi from "./useFetchApi";
export default function usePaginate({ url, defaultData = [], initLoad = true, presentData = null, defaultLimit = 20, defaultSort = "createdAt:asc", searchKey = "searchKey", initQueries = {}, }) {
    const [queries, setQueries] = useState({
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
    const { data, fetchApi, loading, fetched, setData, setCount } = fetchApiHook;
    const handleFetchApi = async (params = {}, keepData = false) => {
        await fetchApi(url, { ...queries, ...params }, keepData);
    };
    const onQueryChange = (key, value, isFetch = false) => {
        setQueries((prev) => ({ ...prev, [key]: value }));
        if (isFetch)
            handleFetchApi({ [key]: value });
    };
    const onQueriesChange = (newQueries, isFetch = false) => {
        setQueries((prev) => ({ ...prev, ...newQueries }));
        if (isFetch)
            handleFetchApi(newQueries);
    };
    const onPaginate = async (paginate) => {
        let newPage = queries.page;
        if (paginate === "prev" && queries.page > 1) {
            newPage = queries.page - 1;
        }
        else if (paginate === "next") {
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
