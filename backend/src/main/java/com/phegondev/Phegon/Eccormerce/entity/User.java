package com.phegondev.Phegon.Eccormerce.entity;

import com.phegondev.Phegon.Eccormerce.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Column(unique = true)
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @Column(name = "phone_number")
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    // ✅ Store enum as INT (0 = USER, 1 = ADMIN)
    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private UserRole role;

    @Column(nullable = false)
    @Builder.Default
    private boolean verified = false;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItemList = new ArrayList<>();

    // ✅ Changed from OneToOne → OneToMany
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
