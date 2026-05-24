import api from "./config/api.js";

export const loginUser = async ({
    identifier,
    password,
}) => {

    try {

        const response = await api.post(
            "/api/auth/login",
            {
                identifier,
                password,
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Login Error:",
            error?.response?.data || error.message
        );

        throw error?.response?.data || error;
    }
};