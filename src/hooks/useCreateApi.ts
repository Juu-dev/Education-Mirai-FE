import { useState } from "react";
import { api } from "../helpers/api";

interface UseCreateApiProps {
    url: string;
    fullResp?: boolean;
    successMsg?: string;
    errorMsg?: string;
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
    successMsg = "Saved successfully",
    errorMsg = "Failed to save",
}: UseCreateApiProps) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<any>(null);

    /**
     * @param {any} data
     * @returns {Promise<boolean | CreateApiResponse>}
     */
    const handleCreate = async (
        data: any
    ): Promise<boolean | CreateApiResponse> => {
        try {
            setCreating(true);
            const resp: CreateApiResponse = await api(url, {
                body: data,
                method: "POST",
            });

            if (resp.success) {
                console.log(successMsg);
            }

            if (resp.error) {
                console.error(resp.error);
            }

            if (!resp.success) {
                setErrorData(resp.data);
            }

            return fullResp ? resp : resp.success;
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
