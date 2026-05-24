package com.budly.payments;

import lombok.Data;

@Data
public class PaymentOrderRequest {

    private String userName;

    private String userEmail;

    private String deviceCode;

    private double amount;
}
