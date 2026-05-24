package com.budly.Device.init;


import com.budly.Device.enums.DeviceStatus;
import com.budly.Device.model.Device;
import com.budly.Device.repo.DeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DeviceDataInitializer implements CommandLineRunner {

    private final DeviceRepository deviceRepository;

    @Override
    public void run(String... args) {

        if (deviceRepository.count() > 0) {
            return;
        }

        List<Device> devices = List.of(
                Device.builder()
                        .deviceCode("POTS-1001")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1002")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1003")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1004")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1005")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1006")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1007")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1008")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1009")
                        .status(DeviceStatus.AVAILABLE)
                        .build(),

                Device.builder()
                        .deviceCode("POTS-1010")
                        .status(DeviceStatus.AVAILABLE)
                        .build()
        );

        deviceRepository.saveAll(devices);

        System.out.println("10 devices initialized successfully.");
    }
}
