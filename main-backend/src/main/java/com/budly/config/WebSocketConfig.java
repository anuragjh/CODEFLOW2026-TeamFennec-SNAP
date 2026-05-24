package com.budly.config;

import com.budly.security.JwtService;
import com.budly.utils.ws.MonitorSocketHandler;
import com.budly.utils.ws.WsAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig
        implements WebSocketConfigurer {

    private final MonitorSocketHandler
            handler;

    private final JwtService
            jwtService;

    @Override
    public void registerWebSocketHandlers(
            WebSocketHandlerRegistry registry
    ) {

        System.out.println(
                "REGISTERING WS HANDLER"
        );

        registry.addHandler(
                        handler,
                        "/ws/monitor"
                )
                .addInterceptors(
                        new WsAuthInterceptor(
                                jwtService
                        )
                )
                .setAllowedOriginPatterns("*");
    }
}