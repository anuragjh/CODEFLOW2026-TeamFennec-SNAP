package com.budly.payments;

import lombok.Data;

@Data
public class PaymentVerificationRequest {

    private String orderId;

    private String paymentId;

    private String signature;

    private String userName;

    private String userEmail;

    private double amount;
}