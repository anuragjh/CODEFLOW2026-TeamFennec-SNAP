package com.budly.payments;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PurchaseService purchaseService;

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    private RazorpayClient getClient() throws Exception {
        return new RazorpayClient(keyId, keySecret);
    }


    @PostMapping("/create-order")
    public Map<String, Object> createOrder(
            @RequestBody PaymentOrderRequest req
    ) throws Exception {

        RazorpayClient client = getClient();

        JSONObject orderRequest = new JSONObject();

        orderRequest.put(
                "amount",
                (int) (req.getAmount() * 100)
        );

        orderRequest.put("currency", "INR");

        orderRequest.put(
                "receipt",
                "txn_" + System.currentTimeMillis()
        );


        JSONObject notes = new JSONObject();

        notes.put("userName", req.getUserName());
        notes.put("userEmail", req.getUserEmail());
        notes.put("deviceCode", req.getDeviceCode());

        orderRequest.put("notes", notes);

        Order order = client.orders.create(orderRequest);

        return Map.of(
                "orderId", order.get("id"),
                "amount", req.getAmount(),
                "key", keyId
        );
    }


    @PostMapping("/verify")
    public Map<String, String> verify(
            @RequestBody PaymentVerificationRequest req
    ) throws Exception {

        JSONObject options = new JSONObject();

        options.put(
                "razorpay_order_id",
                req.getOrderId()
        );

        options.put(
                "razorpay_payment_id",
                req.getPaymentId()
        );

        options.put(
                "razorpay_signature",
                req.getSignature()
        );

        boolean isValid = Utils.verifyPaymentSignature(
                options,
                keySecret
        );

        if (!isValid) {
            throw new RuntimeException(
                    "Payment verification failed"
            );
        }


        purchaseService.onSuccessPurchase(
                req.getUserName(),
                req.getUserEmail(),
                req.getDeviceCode(),
                req.getAmount(),
                req.getOrderId(),
                req.getPaymentId()
        );

        return Map.of(
                "status",
                "success"
        );
    }
}
