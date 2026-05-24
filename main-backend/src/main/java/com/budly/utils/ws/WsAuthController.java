package com.budly.utils.ws;

import com.budly.Device.model.Device;
import com.budly.security.JwtService;
import com.budly.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ws")
@RequiredArgsConstructor
public class WsAuthController {

    private final JwtService jwtService;

    @PostMapping("/token")
    public WsTokenResponse getToken(
            @RequestBody WsTokenRequest req,
            @AuthenticationPrincipal
            UserDetailsImpl user
    ) {

        String requestedTopic =
                req.getTopic();

        boolean allowed =
                user.getDeviceCodes()
                        .stream()
                        .anyMatch(device ->
                                requestedTopic.equals(
                                        "monitor/" + device
                                )
                        );

        if (!allowed) {

            throw new RuntimeException(
                    "Unauthorized topic"
            );
        }

        String token =
                jwtService.generateWsToken(
                        user.getUsername(),
                        requestedTopic
                );

        return new WsTokenResponse(token);
    }
}