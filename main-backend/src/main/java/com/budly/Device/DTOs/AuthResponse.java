package com.budly.Device.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class AuthResponse {

    private String token;
    private List<String> deviceCodes;
}
