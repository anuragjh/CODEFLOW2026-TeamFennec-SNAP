package com.budly.Device.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "monitor_logs",
        indexes = {
                @Index(
                        name = "idx_monitor_device",
                        columnList = "deviceId"
                ),
                @Index(
                        name = "idx_monitor_created",
                        columnList = "createdAt"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private Integer peopleCount;

    @Lob
    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String payload;

    @Column(nullable = false)
    private Long timestamp;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();
    }
}
