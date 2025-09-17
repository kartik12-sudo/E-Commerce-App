package com.phegondev.Phegon.Eccormerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:3000",                           // Local React dev
                                "http://ec2-98-88-161-195.compute-1.amazonaws.com", // EC2 domain (HTTP)
                                "https://ec2-98-88-161-195.compute-1.amazonaws.com", // EC2 domain (HTTPS)
                                "http://98.88.161.195",                            // EC2 public IP (HTTP)
                                "https://98.88.161.195",                           // EC2 public IP (HTTPS)
                                "https://d314vw99hkby.cloudfront.net"              // ✅ CloudFront CDN
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}

