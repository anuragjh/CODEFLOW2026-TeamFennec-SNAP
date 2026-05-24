package com.budly.Device.repo;

import com.budly.Device.enums.DeviceStatus;
import com.budly.Device.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, String> {

    boolean existsByDeviceCode(String deviceCode);

    List<Device> findByStatus(DeviceStatus status);

    long countByStatus(DeviceStatus status);

    Optional<Device> findByDeviceCode(String deviceCode);

    Optional<Device> findFirstByStatusAndUserIsNull(
            DeviceStatus status
    );
}