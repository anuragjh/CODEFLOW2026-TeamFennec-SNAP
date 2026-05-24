
import api from "./config/api.js";


export const createOrder = async ({
    amount,
    userName,
    userEmail,
    deviceCode,
}) => {
    try {
        const response = await api.post(
            "/payment/create-order",
            {
                amount,
                userName,
                userEmail,
                deviceCode,
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Create Order Error:",
            error?.response?.data || error.message
        );

        throw error?.response?.data || error;
    }
};



export const verifyPayment = async ({
    orderId,
    paymentId,
    signature,
    userName,
    userEmail,
    deviceCode,
    amount,
}) => {
    try {

        const response = await api.post(
            "/payment/verify",
            {
                orderId,
                paymentId,
                signature,
                userName,
                userEmail,
                deviceCode,
                amount,
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Payment Verification Error:",
            error?.response?.data || error.message
        );

        throw error?.response?.data || error;
    }
};



export const checkEmailAvailability = async (email) => {
    try {

        const response = await api.post(
            `/api/auth/check-email?email=${encodeURIComponent(email)}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Email Check Error:",
            error?.response?.data || error.message
        );

        throw error?.response?.data || error;
    }
};