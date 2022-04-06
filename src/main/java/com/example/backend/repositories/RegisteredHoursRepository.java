package com.example.backend.repositories;

import com.example.backend.entities.RegisteredHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegisteredHoursRepository extends JpaRepository<RegisteredHours, Long> {
    List<RegisteredHours> findByIdUserAndEndedIsNull(Long id);
}
