package com.budly.Device.repo;


import com.budly.Device.model.MonitorLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonitorLogRepository
        extends JpaRepository<MonitorLog, String> {

    List<MonitorLog> findTop100ByDeviceIdOrderByCreatedAtDesc(
            String deviceId
    );
}
