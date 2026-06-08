import { axios } from "@/lib";

export const GET_REQUEST = async (url, params = {}) => {
    return await axios
        .get(url, {
            params,
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            const isDev = process.env.NODE_ENV !== "production";
            const fallbackMessage = "Something went wrong. Please try again.";
            return {
                status: false,
                message: isDev
                    ? error?.message || fallbackMessage
                    : fallbackMessage,
                data: false,
            };
        });
};

export const POST_REQUEST = async (url, data, params = {}, headers = {}) => {
    return await axios
        .post(url, data, {
            params,
            headers: {
                ...headers,
            },
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            const responseData = error?.response?.data || {};
            const statusCode = error?.response?.status;

            let errors = {};
            if (
                responseData &&
                typeof responseData === "object" &&
                responseData.errors &&
                typeof responseData.errors === "object"
            ) {
                errors = responseData.errors;
            }

            let messageFromServer = "";
            if (
                responseData &&
                typeof responseData === "object" &&
                typeof responseData.message === "string"
            ) {
                messageFromServer = responseData.message;
            }

            const sensitivePatterns =
                /(sql|syntax error|stack trace|exception|select\s+.*from|at\s+[\w.]+)/i;

            const genericMessage = "Something went wrong. Please try again.";

            let safeMessage = genericMessage;

            if (
                messageFromServer &&
                !sensitivePatterns.test(messageFromServer)
            ) {
                safeMessage = messageFromServer;
            } else if (
                error?.message &&
                process.env.NODE_ENV !== "production"
            ) {
                safeMessage = error.message;
            }

            return {
                status: false,
                message: safeMessage,
                errors,
                data: false,
                code: statusCode,
            };
        });
};

export const PUT_REQUEST = async (url, data, params = {}) => {
    return await axios
        .put(url, data, { params })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            const isDev = process.env.NODE_ENV !== "production";
            const fallbackMessage = "Something went wrong. Please try again.";
            return {
                status: false,
                message: isDev
                    ? error?.message || fallbackMessage
                    : fallbackMessage,
                data: false,
            };
        });
};

export const DELETE_REQUEST = async (url, params) => {
    return await axios
        .delete(url, { params })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            const isDev = process.env.NODE_ENV !== "production";
            const fallbackMessage = "Something went wrong. Please try again.";
            return {
                status: false,
                message: isDev
                    ? error?.message || fallbackMessage
                    : fallbackMessage,
                data: false,
            };
        });
};
