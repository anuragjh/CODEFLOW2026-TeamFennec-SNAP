package com.budly.utils.ws;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class MonitorSocketHandler
        extends TextWebSocketHandler {

    private final ObjectMapper mapper;

    @Override
    public void afterConnectionEstablished(
            WebSocketSession session
    ) throws Exception {

        System.out.println(
                "WS CONNECTED SUCCESSFULLY"
        );

        System.out.println(
                "SESSION ID: "
                        + session.getId()
        );

        System.out.println(
                "ATTRIBUTES: "
                        + session.getAttributes()
        );

        super.afterConnectionEstablished(
                session
        );
    }

    @Override
    protected void handleTextMessage(
            WebSocketSession session,
            TextMessage message
    ) {

        try {

            System.out.println(
                    "================================="
            );

            System.out.println(
                    "MESSAGE RECEIVED"
            );

            String payload =
                    message.getPayload();

            System.out.println(
                    "PAYLOAD: " + payload
            );

            JsonNode json =
                    mapper.readTree(payload);

            System.out.println(
                    "JSON PARSED"
            );

            String topic =
                    json.has("topic")
                            ? json.get("topic").asText()
                            : null;

            System.out.println(
                    "TOPIC: " + topic
            );

            String allowedTopic =
                    (String) session
                            .getAttributes()
                            .get("topic");

            System.out.println(
                    "ALLOWED TOPIC: "
                            + allowedTopic
            );

            if (topic == null) {

                System.out.println(
                        "TOPIC MISSING"
                );

                return;
            }

            if (!topic.equals(allowedTopic)) {

                System.out.println(
                        "TOPIC MISMATCH"
                );

                session.close(
                        CloseStatus.NOT_ACCEPTABLE
                );

                return;
            }

            System.out.println(
                    "VALID MESSAGE RECEIVED"
            );

            System.out.println(json);

            System.out.println(
                    "================================="
            );

        } catch (Exception e) {

            System.out.println(
                    "WS MESSAGE ERROR"
            );

            e.printStackTrace();
        }
    }

    @Override
    public void handleTransportError(
            WebSocketSession session,
            Throwable exception
    ) throws Exception {

        System.out.println(
                "WS TRANSPORT ERROR"
        );

        exception.printStackTrace();

        super.handleTransportError(
                session,
                exception
        );
    }

    @Override
    public void afterConnectionClosed(
            WebSocketSession session,
            CloseStatus status
    ) throws Exception {

        System.out.println(
                "WS CLOSED"
        );

        System.out.println(
                "STATUS: " + status
        );

        super.afterConnectionClosed(
                session,
                status
        );
    }
}

