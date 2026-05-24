package com.budly.payments;

import com.budly.Device.model.Device;
import com.budly.Device.model.User;
import com.budly.Device.repo.UserRepository;
import com.budly.Device.service.DeviceService;
import com.budly.invoice.InvoiceGenerator;
import com.budly.mail.EmailService;
import com.budly.mail.MailToSend;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final DeviceService deviceService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void onSuccessPurchase(
            String userName,
            String userEmail,
            double amount,
            String orderId,
            String paymentId
    ) {

        final String[] generatedPassword = {null};

        User user = userRepository
                .findByEmail(userEmail.toLowerCase())
                .orElseGet(() -> {

                    generatedPassword[0] =
                            "BDLY-" +
                                    UUID.randomUUID()
                                            .toString()
                                            .replace("-", "")
                                            .substring(0, 10)
                                            .toUpperCase();

                    User newUser = User.builder()
                            .email(userEmail.toLowerCase())
                            .fullName(userName)
                            .password(
                                    passwordEncoder.encode(
                                            generatedPassword[0]
                                    )
                            )
                            .build();

                    return userRepository.save(newUser);
                });

        Device device = deviceService.assignDeviceToUser(
                user
        );

        String invoicePath = InvoiceGenerator.generateInvoice(
                orderId,
                userName,
                userEmail,
                paymentId,
                List.of(
                        "Budly Industrial Monitoring Device (" +
                                device.getDeviceCode() +
                                ")"
                ),
                amount
        );

        try {

            String body = MailToSend.purchaseSuccessBody(
                    userName,
                    user.getEmail(),
                    device.getDeviceCode(),
                    orderId,
                    generatedPassword[0]
            );

            emailService.sendMailWithAttachment(
                    userEmail,
                    "Budly Purchase Successful - Invoice Attached",
                    body,
                    invoicePath
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}