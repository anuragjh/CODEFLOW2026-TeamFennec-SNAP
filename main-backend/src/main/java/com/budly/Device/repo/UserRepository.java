package com.budly.Device.repo;

import com.budly.Device.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("""
        SELECT u
        FROM User u
        LEFT JOIN FETCH u.devices
        WHERE u.email = :email
    """)
    Optional<User> findByEmailWithDevices(
            @Param("email") String email
    );
}
