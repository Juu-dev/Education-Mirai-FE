import { useState } from "react";
import { api } from "../helpers/api";
export default function useEditApi({ url, defaultState = false, fullResp = false, useToast = true, handleSuccess = () => { }, handleError = () => { } }) {
    const [editing, setEditing] = useState(defaultState);
    const [errorData, setErrorData] = useState(null);
    /**
     * @param {any} data
     * @param {boolean | string} newEditing
     * @returns {Promise<boolean | EditApiResponse>}
     */
    const handleEdit = async (data, newEditing = true) => {
        try {
            setEditing((prev) => typeof newEditing === "boolean"
                ? newEditing
                : { ...prev, [newEditing]: true });
            const resp = await api(url, {
                body: data,
                // method: "PUT",
                method: "PATCH",
            });
            if (resp.success && useToast) {
                handleSuccess();
            }
            if (resp.error) {
                handleError();
            }
            if (!resp.success) {
                setErrorData(resp.data);
            }
            return fullResp ? resp : resp.success;
        }
        catch (e) {
            console.error(e);
            return fullResp
                ? {
                    success: false,
                    error: e instanceof Error ? e.message : String(e),
                }
                : false;
        }
        finally {
            setEditing((prev) => typeof newEditing === "boolean"
                ? !newEditing
                : { ...prev, [newEditing]: false });
        }
    };
    return { editing, handleEdit, errorData };
}
