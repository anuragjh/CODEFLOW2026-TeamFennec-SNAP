import mqtt from "mqtt";

const MQTT_BROKER =
    "ws://xa1ef2e1.ala.dedicated.aws.emqxcloud.com:8083/mqtt";

const MQTT_OPTIONS = {

    username: "nandini",

    password: "2004",

    reconnectPeriod: 3000,

    connectTimeout: 4000,

    clean: true,
};

let client = null;

export const connectMQTT = ({
    topic,
    onConnect,
    onMessage,
    onError,
    onClose,
}) => {

    if (
        client &&
        client.connected
    ) {

        return client;
    }

    client = mqtt.connect(

        MQTT_BROKER,

        MQTT_OPTIONS
    );

    client.on(
        "connect",

        () => {

            console.log(
                "MQTT CONNECTED"
            );

            client.subscribe(

                topic,

                (error) => {

                    if (error) {

                        console.error(
                            "MQTT SUBSCRIBE ERROR:",
                            error
                        );

                        return;
                    }

                    console.log(
                        `SUBSCRIBED TO ${topic}`
                    );

                    if (onConnect) {

                        onConnect();
                    }
                }
            );
        }
    );

    client.on(
        "message",

        (
            receivedTopic,
            message
        ) => {

            try {

                const parsed =
                    JSON.parse(
                        message.toString()
                    );

                console.log(
                    "MQTT MESSAGE:",
                    parsed
                );

                if (onMessage) {

                    onMessage({
                        topic:
                            receivedTopic,

                        data:
                            parsed,
                    });
                }

            } catch {

                console.log(
                    "MQTT RAW:",
                    message.toString()
                );

                if (onMessage) {

                    onMessage({
                        topic:
                            receivedTopic,

                        data:
                            message.toString(),
                    });
                }
            }
        }
    );

    client.on(
        "error",

        (error) => {

            console.error(
                "MQTT ERROR:",
                error
            );

            if (onError) {

                onError(error);
            }
        }
    );

    client.on(
        "close",

        () => {

            console.log(
                "MQTT DISCONNECTED"
            );

            if (onClose) {

                onClose();
            }
        }
    );

    return client;
};

export const disconnectMQTT =
    () => {

        if (client) {

            client.end(true);

            console.log(
                "MQTT CLOSED"
            );

            client = null;
        }
    };