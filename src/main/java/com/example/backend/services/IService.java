package com.example.backend.services;


import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public interface IService<T> {
    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);
}
