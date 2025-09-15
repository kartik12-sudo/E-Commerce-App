package com.phegondev.Phegon.Eccormerce.repository;

import com.phegondev.Phegon.Eccormerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

    List<Address> findByUserId(Long userId);

    void deleteByIdAndUserId(Long id, Long userId);

    boolean existsByUserId(Long userId);
}
