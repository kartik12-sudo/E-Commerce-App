package com.phegondev.Phegon.Eccormerce.service.interf;

public interface OtpService {
    /**
     * 
     * @param email 
     */
    void generateAndSendOtp(String email);

    /**
     * 
     * @param email 
     * @param otpCode 
     * @return 
     */
    boolean verifyOtp(String email, String otpCode);
}
