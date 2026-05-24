package com.budly.Device.service;

import com.budly.Device.enums.DeviceStatus;
import com.budly.Device.model.Device;
import com.budly.Device.model.User;
import com.budly.Device.repo.DeviceRepository;
import com.budly.Device.repo.UserRepository;
import com.budly.Device.service.exc.DeviceUnavailableException;
import com.budly.Device.service.exc.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;


    public Device createDevice(String deviceCode) {

        if (deviceRepository.existsByDeviceCode(deviceCode)) {
            throw new RuntimeException("Device code already exists");
        }

        Device device = Device.builder()
                .deviceCode(deviceCode)
                .status(DeviceStatus.AVAILABLE)
                .build();

        return deviceRepository.save(device);
    }

    @Transactional
    public Device assignDeviceToUser(User user) {

        Device device = deviceRepository
                .findFirstByStatusAndUserIsNull(
                        DeviceStatus.AVAILABLE
                )
                .orElseThrow(() ->
                        new DeviceUnavailableException(
                                "No available device found"
                        )
                );

        device.setUser(user);

        device.setStatus(DeviceStatus.SOLD);

        return deviceRepository.save(device);
    }

    @Transactional
    public Device reserveDevice(String deviceCode) {

        Device device = deviceRepository.findByDeviceCode(deviceCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Device not found"));

        if (device.getStatus() != DeviceStatus.AVAILABLE) {
            throw new DeviceUnavailableException(
                    "Device cannot be reserved"
            );
        }

        device.setStatus(DeviceStatus.RESERVED);

        return deviceRepository.save(device);
    }

    @Transactional
    public Device releaseReservedDevice(String deviceCode) {

        Device device = deviceRepository.findByDeviceCode(deviceCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Device not found"));

        if (device.getStatus() == DeviceStatus.RESERVED) {
            device.setStatus(DeviceStatus.AVAILABLE);
        }

        return deviceRepository.save(device);
    }

    public List<Device> getAvailableDevices() {
        return deviceRepository.findByStatus(DeviceStatus.AVAILABLE);
    }

    public List<Device> getSoldDevices() {
        return deviceRepository.findByStatus(DeviceStatus.SOLD);
    }

    public List<Device> getReservedDevices() {
        return deviceRepository.findByStatus(DeviceStatus.RESERVED);
    }

    public Device getDevice(String deviceCode) {
        return deviceRepository.findByDeviceCode(deviceCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Device not found"));
    }

    public long availableStockCount() {
        return deviceRepository.countByStatus(DeviceStatus.AVAILABLE);
    }

    public long soldStockCount() {
        return deviceRepository.countByStatus(DeviceStatus.SOLD);
    }

    public long reservedStockCount() {
        return deviceRepository.countByStatus(DeviceStatus.RESERVED);
    }
}