package com.phegondev.Phegon.Eccormerce.service.impl;

import com.phegondev.Phegon.Eccormerce.entity.Otp;
import com.phegondev.Phegon.Eccormerce.repository.OtpRepo;
import com.phegondev.Phegon.Eccormerce.repository.UserRepo;
import com.phegondev.Phegon.Eccormerce.service.interf.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepo otpRepo;
    private final UserRepo userRepo;  
    private final JavaMailSender mailSender;

    @Override
    public void generateAndSendOtp(String email) {
        String otpCode = String.valueOf(100000 + new Random().nextInt(900000));

        Otp otp = Otp.builder()
                .email(email)
                .otpCode(otpCode)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .used(false)
                .build();

        otpRepo.save(otp);
        sendOtpEmail(email, otpCode);
    }

    private void sendOtpEmail(String email, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code - Phegon E-Commerce");
        message.setText("Hello,\n\nYour OTP is: " + otpCode +
                "\nThis OTP will expire in 5 minutes.\n\nIf you did not request this, please ignore.");
        mailSender.send(message);
    }

    @Override
    public boolean verifyOtp(String email, String otpCode) {
        return otpRepo.findByEmailAndOtpCodeAndUsedFalse(email, otpCode)
                .filter(otp -> otp.getExpiryTime().isAfter(LocalDateTime.now()))
                .map(otp -> {
                    otp.setUsed(true);
                    otpRepo.save(otp);

                    // 🔹 Mark user as verified
                    userRepo.findByEmail(email).ifPresent(user -> {
                        user.setVerified(true);
                        userRepo.save(user);
                    });

                    return true;
                })
                .orElse(false);
    }
}
