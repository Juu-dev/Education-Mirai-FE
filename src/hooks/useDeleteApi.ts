import { useState } from "react";
import { api } from "../helpers/api";

interface UseDeleteApiProps {
    url: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    data?: any; // Có thể tùy chỉnh theo phản hồi của API
}

export default function useDeleteApi({ url }: UseDeleteApiProps) {
    const [deleting, setDeleting] = useState<boolean>(false);

    /**
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    const handleDelete = async (data: any): Promise<boolean> => {
        try {
            setDeleting(true);

            const resp: ApiResponse = await api(url, {
                body: { data },
                method: "DELETE",
            });

            if (resp.success) {
                console.log("Deleted successfully");
                return true;
            }

            if (resp.error) {
                console.error(resp.error);
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
