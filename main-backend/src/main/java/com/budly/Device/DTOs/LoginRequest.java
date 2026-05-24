package com.budly.Device.DTOs;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier;
    private String password;
}
