package com.example.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IPageService<T> {
    Page<T> findAll(Pageable pageable, String searchText);

    Page<T> findAll(Pageable pageable);
}