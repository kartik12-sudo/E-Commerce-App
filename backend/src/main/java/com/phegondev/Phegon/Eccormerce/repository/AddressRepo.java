package com.phegondev.Phegon.Eccormerce.repository;

import com.phegondev.Phegon.Eccormerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

    
    boolean existsByUserId(Long userId);
}
