package com.budly.Device.service;

import com.budly.Device.DTOs.*;
import com.budly.Device.enums.DeviceStatus;
import com.budly.Device.model.Device;
import com.budly.Device.model.User;
import com.budly.Device.repo.DeviceRepository;
import com.budly.Device.repo.UserRepository;
import com.budly.mail.EmailService;
import com.budly.mail.MailToSend;
import com.budly.security.JwtService;
import com.budly.security.UserDetailsImpl;
import com.budly.utils.UsedResetTokenStore;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsedResetTokenStore usedResetTokenStore;
    private final EmailService emailService;


    public AuthResponse login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getIdentifier().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        String token = jwtService.generateToken(userDetails);

        emailService.sendMail(
                user.getEmail(),
                "New Login Detected 🔐",
                MailToSend.suspiciousLoginBody(user.getFullName())
        );

        List<String> deviceCodes = user.getDevices()
                .stream()
                .map(Device::getDeviceCode)
                .toList();

        return new AuthResponse(
                token,
                deviceCodes
        );
    }

    public Message forgotPassword(String email) {

        userRepository.findByEmail(email.toLowerCase())
                .ifPresent(user -> {

                    String token = jwtService.generateResetToken(user.getEmail());

                    emailService.sendMail(
                            user.getEmail(),
                            "Password Reset Request",
                            MailToSend.resetPasswordBody(
                                    user.getFullName(),
                                    token
                            )
                    );
                });

        Message msg = new Message();
        msg.setMessage("If the email exists, a reset link has been sent");

        return msg;
    }

    public Message resetPassword(String token, String newPassword) {

        if (usedResetTokenStore.isUsed(token)) {
            throw new RuntimeException("Token already used");
        }

        String email = jwtService.validateResetToken(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        usedResetTokenStore.markUsed(token);

        Message msg = new Message();
        msg.setMessage("Password updated successfully");

        return msg;
    }

    public EmailCheckResponse checkEmailAvailability(String email) {

        boolean exists = userRepository.existsByEmail(email.toLowerCase());

        return new EmailCheckResponse(!exists);
    }
}
