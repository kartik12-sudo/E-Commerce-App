package com.phegondev.Phegon.Eccormerce.repository;

import com.phegondev.Phegon.Eccormerce.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepo extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmailAndOtpCodeAndUsedFalse(String email, String otpCode);
}
