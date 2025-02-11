import { useState } from "react";
import { api } from "../helpers/api";
import {message} from "antd";

interface UseEditApiProps {
    url: string;
    defaultState?: boolean | Record<string, boolean>;
    fullResp?: boolean;
    useToast?: boolean;
    successMsg?: string;
    errorMsg?: string;
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
    successMsg = "Saved successfully",
    errorMsg = "Failed to save",
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
                message.success(successMsg)
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
            message.error(errorMsg)
            console.error(errorMsg, e);
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
