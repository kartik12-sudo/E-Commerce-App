package com.phegondev.Phegon.Eccormerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "otps")
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "otp_code")
    private String otpCode;

    @Column(name = "expiry_time")
    private LocalDateTime expiryTime;

    private boolean used;
}
