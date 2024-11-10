import { useState } from "react";
import { api } from "../helpers/api";

interface UseCreateApiProps {
    url: string;
    fullResp?: boolean;
    successMsg?: string;
    errorMsg?: string;
}

interface CreateApiResponse {
    message?: string;
    result?: {
        success: boolean;
        data?: any;
        error?: string;
    }
}

export default function useCreateApiFormData({
                                                 url,
                                                 fullResp = false,
                                                 successMsg = "Saved successfully",
                                                 errorMsg = "Failed to save",
                                             }: UseCreateApiProps) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<any>(null);

    /**
     * @param {FormData} data - The FormData object for file uploads and extra data
     * @returns {Promise<boolean | CreateApiResponse>}
     */
    const handleCreate = async (
        data: FormData
    ): Promise<boolean | CreateApiResponse> => {
        try {
            setCreating(true);
            const response: CreateApiResponse = await api(url, {
                body: data,
                method: "POST",
                headers: {
                },
            });

            const resp = response?.result || {}

            if (resp?.success) {
                console.log(successMsg);
            }

            if (resp?.error) {
                console.error(resp.error);
            }

            if (!resp?.success) {
                setErrorData(resp?.data);
            }

            return fullResp ? resp : resp?.success;
        } catch (e) {
            console.error(errorMsg, e);
            return fullResp
                ? {
                    success: false,
                    error: e instanceof Error ? e.message : String(e),
                }
                : false;
        } finally {
            setCreating(false);
        }
    };

    return { creating, handleCreate, errorData };
}
