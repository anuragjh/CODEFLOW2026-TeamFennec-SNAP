package com.budly.Device.controller;

import com.budly.Device.DTOs.*;
import com.budly.Device.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest req) {
		return authService.login(req);
	}
@PostMapping("/forgot-password")
public Message forgot(@RequestParam String email) {
    return authService.forgotPassword(email);
}
@PostMapping("/reset-password")
public Message reset(@RequestParam String token,
                     @RequestParam String newPassword) {
    return authService.resetPassword(token, newPassword);
}
@PostMapping("/check-email")
public EmailCheckResponse checkEmail(@RequestParam String email) {
    return authService.checkEmailAvailability(email);
}
}
