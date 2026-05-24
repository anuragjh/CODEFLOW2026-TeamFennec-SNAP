package com.budly.utils;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class UsedResetTokenStore {

    private final StringRedisTemplate redis;

    private static final String KEY_PREFIX = "reset_used:";

    public boolean isUsed(String token) {
        return Boolean.TRUE.equals(redis.hasKey(KEY_PREFIX + token));
    }

    public void markUsed(String token) {
        redis.opsForValue().set(KEY_PREFIX + token, "1", 10, TimeUnit.MINUTES);
    }
}
