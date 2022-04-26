package com.example.backend.repositories;

import com.example.backend.entities.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TasksRepository extends JpaRepository<Tasks, Long> {
    List<Tasks> findByIdUser(Long userid);
    List<Tasks> findByIdUserAndDone(Long userid, boolean done);
    List<Tasks> findByDone(boolean done);
}
