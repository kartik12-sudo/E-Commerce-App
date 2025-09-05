package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.service.interf.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    
    @PostMapping("/verify")
    public ResponseEntity<Response> verifyOtp(@RequestParam String email, @RequestParam String otpCode) {
        boolean verified = otpService.verifyOtp(email, otpCode);

        if (verified) {
            return ResponseEntity.ok(
                    Response.builder()
                            .status(200)
                            .message("OTP verified successfully. You can now log in.")
                            .build()
            );
        } else {
            return ResponseEntity.badRequest()
                    .body(Response.builder()
                            .status(400)
                            .message("Invalid or expired OTP.")
                            .build()
                    );
        }
    }
}
