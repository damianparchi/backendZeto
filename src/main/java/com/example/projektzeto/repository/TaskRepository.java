package com.example.projektzeto.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.projektzeto.entity.Task;
@Repository
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
    @Query("from Task i where i.tytul LIKE %:searchText% OR i.przydzielonoDla LIKE %:searchText% OR i.deadline LIKE %:searchText% OR i.opis LIKE %:searchText% OR i.typ LIKE %:searchText% OR i.priorytety LIKE %:searchText% OR i.statusy LIKE %:searchText% order by i.tytul ASC")
    Page<Task> findAllTasks(Pageable pageable, @Param("searchText") String searchText);
}

