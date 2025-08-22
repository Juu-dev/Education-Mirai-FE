import { useState } from "react";
import { api } from "../helpers/api";
export default function useCreateApi({ url, fullResp = false, isAuth = true, isWithCredentials = false }) {
    const [creating, setCreating] = useState(false);
    const [errorData, setErrorData] = useState(null);
    /**
     * @param {any} data
     * @param handleSuccess
     * @param handleError
     * @returns {Promise<boolean | CreateApiResponse>}
     */
    const handleCreate = async (data = {}, handleSuccess = (resp) => { }, handleError = (resp) => { }) => {
        try {
            setCreating(true);
            const resp = await api(url, {
                body: data,
                method: "POST",
            }, isAuth, isWithCredentials);
            if (resp.success) {
                handleSuccess(resp);
            }
            if (resp.error) {
                handleError(resp);
            }
            if (!resp.success) {
                setErrorData(resp?.data);
            }
            return fullResp ? resp : resp.success;
        }
        catch (e) {
            handleError(e);
        }
        finally {
            setCreating(false);
        }
    };
    return { creating, handleCreate, errorData };
}
