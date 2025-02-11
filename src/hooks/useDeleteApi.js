import { useState } from "react";
import { api } from "../helpers/api";
import { message } from "antd";
export default function useDeleteApi({ url, auth = true, messageSuccess = "Delete Successfully!" }) {
    const [deleting, setDeleting] = useState(false);
    /**
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    const handleDelete = async (data = {}) => {
        try {
            setDeleting(true);
            const options = {
                body: data,
                method: "DELETE",
                // ...(Object.keys(data).length > 0 && { body: data }),
            };
            const resp = await api(url, options, auth);
            if (resp.success) {
                console.log("Deleted successfully");
                message.success(messageSuccess);
                return true;
            }
            if (resp.error) {
                console.error(resp.error);
                message.error(resp.error);
            }
        }
        catch (e) {
            message.error(e.response.data.message);
            console.log("Failed to delete", e);
        }
        finally {
            setDeleting(false);
        }
        return false;
    };
    return { deleting, handleDelete };
}
