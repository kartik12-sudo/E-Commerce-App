package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.dto.LoginRequest;
import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.dto.UserDto;
import com.phegondev.Phegon.Eccormerce.entity.User;
import com.phegondev.Phegon.Eccormerce.service.interf.OtpService;
import com.phegondev.Phegon.Eccormerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final OtpService otpService;

    
    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody UserDto registrationRequest) {
        // Save user
        Response response = userService.registerUser(registrationRequest);

        // Send OTP
        otpService.generateAndSendOtp(registrationRequest.getEmail());

        return ResponseEntity.ok(
                Response.builder()
                        .status(200)
                        .message("User registered successfully. OTP sent to email.")
                        .build()
        );
    }

    
    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            return ResponseEntity.badRequest()
                    .body(Response.builder()
                            .status(400)
                            .message("Please verify your email via OTP before logging in.")
                            .build());
        }

        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }
}
