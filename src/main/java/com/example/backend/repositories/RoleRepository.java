package com.example.backend.repositories;

import com.example.backend.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles, Long> {
    Roles findByRoleCode(String roleCode);
}