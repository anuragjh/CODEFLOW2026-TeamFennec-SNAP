package com.budly.Device.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailCheckResponse {
    private boolean allowed;
}
