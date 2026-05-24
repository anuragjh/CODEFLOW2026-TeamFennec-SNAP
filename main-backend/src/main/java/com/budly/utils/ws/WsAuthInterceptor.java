package com.budly.utils.ws;

import com.budly.security.JwtService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@RequiredArgsConstructor
public class WsAuthInterceptor
        implements HandshakeInterceptor {

    private final JwtService
            jwtService;

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {

        try {

            System.out.println(
                    "WS HANDSHAKE STARTED"
            );

            String query =
                    request.getURI()
                            .getQuery();

            System.out.println(
                    "QUERY: " + query
            );

            if (
                    query == null ||
                    !query.startsWith(
                            "token="
                    )
            ) {

                System.out.println(
                        "TOKEN MISSING"
                );

                return false;
            }

            String token =
                    query.substring(6);

            Claims claims =
                    jwtService
                            .extractAllClaims(
                                    token
                            );

            String topic =
                    claims.get(
                            "topic",
                            String.class
                    );

            System.out.println(
                    "TOKEN VALID"
            );

            System.out.println(
                    "TOPIC: " + topic
            );

            attributes.put(
                    "topic",
                    topic
            );

            return true;

        } catch (Exception e) {

            System.out.println(
                    "WS AUTH FAILED"
            );

            e.printStackTrace();

            return false;
        }
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception
    ) {

        System.out.println(
                "WS HANDSHAKE COMPLETED"
        );
    }
}