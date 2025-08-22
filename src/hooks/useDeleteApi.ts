import { useState } from "react";
import { api } from "../helpers/api";

interface UseDeleteApiProps {
    url: string;
    auth?: boolean;
    handleSuccess?: () => any;
    handleError?: () => any;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any; // Có thể tùy chỉnh theo phản hồi của API
}

export default function useDeleteApi({
    url,
    auth = true,
    handleSuccess = () => {},
    handleError = () => {}
}: UseDeleteApiProps) {
    const [deleting, setDeleting] = useState<boolean>(false);

    /**
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    const handleDelete = async (data: Record<string, any> = {}): Promise<boolean> => {
        try {
            setDeleting(true);

            const options: RequestInit = {
                body: data as any,
                method: "DELETE",
                // ...(Object.keys(data).length > 0 && { body: data }),
            };

            const resp: ApiResponse = await api(url, options as any, auth);

            if (resp.success) {
                handleSuccess()
            }

            if (resp.error) {
                handleError()
            }
        } catch (e) {
            console.error(e.response.data.message);
        } finally {
            setDeleting(false);
        }

        return false;
    };

    return { deleting, handleDelete };
}
