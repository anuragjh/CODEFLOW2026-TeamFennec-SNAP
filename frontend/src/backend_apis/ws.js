// src/backend_apis/ws.js

import api from "./config/api.js";

export const getWsToken = async (topic) => {

    try {

        const token =
            localStorage.getItem("token");

        const response = await api.post(
            "/api/ws/token",
            {
                topic,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "WS TOKEN ERROR:",
            error
        );

        throw {

            message:

                error?.response?.data?.message ||

                error?.response?.data ||

                error?.message ||

                "Failed to get websocket token",
        };
    }
};


export const connectWebSocket = ({
    wsToken,
    topic,
    onMessage,
    onOpen,
    onClose,
    onError,
}) => {

    const socket = new WebSocket(
        `ws://localhost:8094/ws?token=${wsToken}`
    );

    socket.onopen = () => {

        console.log(
            "WS CONNECTED"
        );

        socket.send(
            JSON.stringify({
                type: "subscribe",
                topic,
            })
        );

        if (onOpen) {
            onOpen();
        }
    };

    socket.onmessage = (event) => {

        try {

            const data =
                JSON.parse(event.data);

            console.log(
                "WS MESSAGE:",
                data
            );

            if (onMessage) {

                onMessage(data);
            }

        } catch {

            console.log(
                "WS RAW:",
                event.data
            );

            if (onMessage) {

                onMessage(event.data);
            }
        }
    };

    socket.onerror = (error) => {

        console.error(
            "WS ERROR:",
            error
        );

        if (onError) {

            onError(error);
        }
    };

    socket.onclose = () => {

        console.log(
            "WS DISCONNECTED"
        );

        if (onClose) {

            onClose();
        }
    };

    return socket;
};