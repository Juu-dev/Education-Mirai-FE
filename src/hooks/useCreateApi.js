import { useState } from "react";
import { api } from "../helpers/api";
import { message } from "antd";
export default function useCreateApi({ url, fullResp = false, successMsg = "Saved successfully", errorMsg = "Failed to save", isAuth = true, isWithCredentials = false }) {
    const [creating, setCreating] = useState(false);
    const [errorData, setErrorData] = useState(null);
    /**
     * @param {any} data
     * @returns {Promise<boolean | CreateApiResponse>}
     */
    const handleCreate = async (data) => {
        try {
            setCreating(true);
            const resp = await api(url, {
                body: data,
                method: "POST",
            }, isAuth, isWithCredentials);
            if (resp.success) {
                console.log(successMsg);
            }
            if (resp.error) {
                console.error(resp.error);
            }
            if (!resp.success) {
                setErrorData(resp.data);
            }
            message.success(successMsg);
            return fullResp ? resp : resp.success;
        }
        catch (e) {
            message.error(errorMsg);
            console.error(errorMsg, e);
            return fullResp
                ? {
                    success: false,
                    error: e instanceof Error ? e.message : String(e),
                }
                : false;
        }
        finally {
            setCreating(false);
        }
    };
    return { creating, handleCreate, errorData };
}
