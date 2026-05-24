import api from "./config/api.js";


export const getWsToken = async (
    topic
) => {

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {

            throw new Error(
                "JWT token missing"
            );
        }

        const response =
            await api.post(
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


export const connectWebSocket =
    async ({
        topic,
        onMessage,
        onOpen,
        onClose,
        onError,
    }) => {

        try {

            const response =
                await getWsToken(
                    topic
                );

            const wsToken =
                response.wsToken;

            if (!wsToken) {

                throw new Error(
                    "WS token missing"
                );
            }

            const socket =
                new WebSocket(
                    `ws://localhost:8094/ws/monitor?token=${wsToken}`
                );

            socket.onopen = () => {

                console.log(
                    "WS CONNECTED"
                );

                console.log(
                    "TOPIC:",
                    topic
                );

                if (onOpen) {

                    onOpen(socket);
                }
            };

            socket.onmessage = (
                event
            ) => {

                try {

                    const data =
                        JSON.parse(
                            event.data
                        );

                    console.log(
                        "LIVE WS MESSAGE:",
                        data
                    );

                    if (onMessage) {

                        onMessage(
                            data
                        );
                    }

                } catch (e) {

                    console.log(
                        "RAW WS MESSAGE:",
                        event.data
                    );

                    if (onMessage) {

                        onMessage(
                            event.data
                        );
                    }
                }
            };

            socket.onerror = (
                error
            ) => {

                console.error(
                    "WS ERROR:",
                    error
                );

                if (onError) {

                    onError(
                        error
                    );
                }
            };

            socket.onclose = (
                event
            ) => {

                console.log(
                    "WS CLOSED:",
                    event
                );

                if (onClose) {

                    onClose(
                        event
                    );
                }
            };

            return socket;

        } catch (error) {

            console.error(
                "CONNECT WS ERROR:",
                error
            );

            throw error;
        }
    };