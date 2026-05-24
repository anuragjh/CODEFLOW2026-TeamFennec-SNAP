package com.budly.config;

import com.budly.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

  @Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http
) throws Exception {

    http
            .csrf(csrf -> csrf.disable())

            .cors(Customizer.withDefaults())

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            "/auth/**",
                            "/api/auth/**",
                            "/payment/**",
                            "/ws/**"
                    ).permitAll()

                    .anyRequest()
                    .authenticated()
            )

            .addFilterBefore(
                    jwtAuthFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

    return http.build();
}

    @Bean
public CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration config =
            new CorsConfiguration();

    config.setAllowedOriginPatterns(
            List.of("*")
    );

    config.setAllowedMethods(
            List.of("*")
    );

    config.setAllowedHeaders(
            List.of("*")
    );

    config.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration(
            "/**",
            config
    );

    return source;
}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
