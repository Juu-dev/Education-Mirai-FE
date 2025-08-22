import { useState } from "react";
import { api } from "../helpers/api";
export default function useDeleteApi({ url, auth = true, handleSuccess = () => { }, handleError = () => { } }) {
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
                handleSuccess();
            }
            if (resp.error) {
                handleError();
            }
        }
        catch (e) {
            console.error(e.response.data.message);
        }
        finally {
            setDeleting(false);
        }
        return false;
    };
    return { deleting, handleDelete };
}
