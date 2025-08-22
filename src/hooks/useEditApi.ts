import { useState } from "react";
import { api } from "../helpers/api";

interface UseEditApiProps {
    url: string;
    defaultState?: boolean | Record<string, boolean>;
    fullResp?: boolean;
    useToast?: boolean;
    handleSuccess?: () => any;
    handleError?: () => any;
}

interface EditApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any; // Kiểu dữ liệu có thể thay đổi tùy theo phản hồi của API
}

export default function useEditApi({
    url,
    defaultState = false,
    fullResp = false,
    useToast = true,
    handleSuccess = () => {},
    handleError = () => {}
}: UseEditApiProps) {
    const [editing, setEditing] = useState<boolean | Record<string, boolean>>(
        defaultState
    );
    const [errorData, setErrorData] = useState<any>(null);

    /**
     * @param {any} data
     * @param {boolean | string} newEditing
     * @returns {Promise<boolean | EditApiResponse>}
     */
    const handleEdit = async (
        data: any,
        newEditing: boolean | string = true
    ): Promise<boolean | EditApiResponse> => {
        try {
            setEditing((prev) =>
                typeof newEditing === "boolean"
                    ? newEditing
                    : { ...prev as any, [newEditing]: true }
            );

            const resp: EditApiResponse = await api(url, {
                body: data,
                // method: "PUT",
                method: "PATCH",
            });

            if (resp.success && useToast) {
                handleSuccess()
            }

            if (resp.error) {
                handleError()
            }

            if (!resp.success) {
                setErrorData(resp.data);
            }

            return fullResp ? resp : resp.success;
        } catch (e) {
            console.error( e);
            return fullResp
                ? {
                      success: false,
                      error: e instanceof Error ? e.message : String(e),
                  }
                : false;
        } finally {
            setEditing((prev) =>
                typeof newEditing === "boolean"
                    ? !newEditing
                    : { ...prev as any, [newEditing]: false }
            );
        }
    };

    return { editing, handleEdit, errorData };
}
