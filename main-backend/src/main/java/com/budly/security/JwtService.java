package com.budly.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    private final SecretKey secretKey;
    private final long expirationMs;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expirationMs}") long expirationMs
    ) {

        this.secretKey =
                Keys.hmacShaKeyFor(secret.getBytes());

        this.expirationMs = expirationMs;
    }

    public String generateToken(
            UserDetailsImpl user
    ) {

        return generateToken(
                Map.of(
                        "userId", user.getUserId(),
                        "fullName", user.getFullName(),
                        "deviceCodes", user.getDeviceCodes()
                ),
                user.getUsername()
        );
    }

    private String generateToken(
            Map<String, Object> claims,
            String email
    ) {

        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expirationMs
                        )
                )
                .signWith(
                        secretKey,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String generateResetToken(
            String email
    ) {

        return Jwts.builder()
                .subject(email)
                .claim("type", "RESET")
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 600000
                        )
                )
                .signWith(
                        secretKey,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String generateWsToken(
            String email,
            String topic
    ) {

        return Jwts.builder()
                .subject(email)
                .claim("topic", topic)
                .claim("type", "WS")
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 300000
                        )
                )
                .signWith(
                        secretKey,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String validateResetToken(
            String token
    ) {

        Claims claims = extractAllClaims(token);

        if (!"RESET".equals(
                claims.get("type")
        )) {

            throw new RuntimeException(
                    "Invalid token"
            );
        }

        if (claims.getExpiration()
                .before(new Date())) {

            throw new RuntimeException(
                    "Token expired"
            );
        }

        return claims.getSubject();
    }

    public boolean validateWsToken(
            String token
    ) {

        Claims claims = extractAllClaims(token);

        if (!"WS".equals(
                claims.get("type")
        )) {

            return false;
        }

        return !claims.getExpiration()
                .before(new Date());
    }

    public Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    public Date extractExpiration(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver
    ) {

        return resolver.apply(
                extractAllClaims(token)
        );
    }

    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {

        final String email =
                extractUsername(token);

        return email.equals(
                userDetails.getUsername()
        ) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(
            String token
    ) {

        return extractExpiration(token)
                .before(new Date());
    }
}
