package com.example.projektzeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projektzeto.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
