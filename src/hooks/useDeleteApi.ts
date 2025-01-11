import { useState } from "react";
import { api } from "../helpers/api";
import {message} from "antd";

interface UseDeleteApiProps {
    url: string;
    auth?: boolean;
    messageSuccess?: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any; // Có thể tùy chỉnh theo phản hồi của API
}

export default function useDeleteApi({ url, auth = true, messageSuccess = "Delete Successfully!" }: UseDeleteApiProps) {
    const [deleting, setDeleting] = useState<boolean>(false);

    /**
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    const handleDelete = async (data: Record<string, any> = {}): Promise<boolean> => {
        try {
            setDeleting(true);

            const options: RequestInit = {
                method: "DELETE",
                // ...(Object.keys(data).length > 0 && { body: data }),
            };

            const resp: ApiResponse = await api(url, options, auth);

            if (resp.success) {
                console.log("Deleted successfully");
                message.success(messageSuccess);
                return true;
            }

            if (resp.error) {
                console.error(resp.error);
                message.error(resp.error);
            }
        } catch (e) {
            console.log("Failed to delete", e);
        } finally {
            setDeleting(false);
        }

        return false;
    };

    return { deleting, handleDelete };
}
