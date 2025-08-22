import { useState } from "react";
import { api } from "../helpers/api";

interface UseCreateApiProps {
    url: string;
    fullResp?: boolean;
    isAuth?: boolean;
    isWithCredentials?: boolean;
}

interface CreateApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any;
}

export default function useCreateApi({
    url,
    fullResp = false,
    isAuth = true,
    isWithCredentials = false
}: UseCreateApiProps) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<any>(null);

    /**
     * @param {any} data
     * @param handleSuccess
     * @param handleError
     * @returns {Promise<boolean | CreateApiResponse>}
     */
    const handleCreate = async (
        data: any = {},
        handleSuccess = (resp: CreateApiResponse) => {},
        handleError = (resp: CreateApiResponse) => {},
    ): Promise<boolean | CreateApiResponse> => {
        try {
            setCreating(true);
            const resp: CreateApiResponse = await api(url, {
                body: data,
                method: "POST",
            }, isAuth, isWithCredentials);

            if (resp.success) {
                handleSuccess(resp)
            }

            if (resp.error) {
                handleError(resp)
            }

            if (!resp.success) {
                setErrorData(resp?.data);
            }

            return fullResp ? resp : resp.success;
        } catch (e) {
            handleError(e);
        } finally {
            setCreating(false);
        }
    };

    return { creating, handleCreate, errorData };
}
