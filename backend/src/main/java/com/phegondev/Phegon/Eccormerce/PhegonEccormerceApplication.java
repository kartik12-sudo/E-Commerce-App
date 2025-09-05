package com.phegondev.Phegon.Eccormerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.phegondev.Phegon.Eccormerce")
@EntityScan(basePackages = "com.phegondev.Phegon.Eccormerce.entity")
@EnableJpaRepositories(basePackages = "com.phegondev.Phegon.Eccormerce.repository")
public class PhegonEccormerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhegonEccormerceApplication.class, args);
    }
}
