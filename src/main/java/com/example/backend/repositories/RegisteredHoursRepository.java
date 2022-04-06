package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.backend.entities.RegisteredHours;

import java.time.LocalDateTime;
import java.util.List;

public interface RegisteredHoursRepository extends JpaRepository<RegisteredHours, Long> {
    List<RegisteredHours> findByIdUserAndEndedIsNull(Long id);
}
