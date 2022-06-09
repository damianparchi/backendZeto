package com.example.backend.controllers;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import com.example.backend.services.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entities.Task;
import com.example.backend.services.IPageService;


@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController implements Resource<Task> {

    @Autowired
    private IService<Task> taskService;
    @Autowired
    private IPageService<Task> taskPageService;

    @Override
    public ResponseEntity<Page<Task>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(taskPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Task>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(taskPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Task> findById(Long id) {
        return new ResponseEntity<>(taskService.findById(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Task> save(Task task) {
        return new ResponseEntity<>(taskService.saveOrUpdate(task), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Task> update(Task task) {
        return new ResponseEntity<>(taskService.saveOrUpdate(task), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(taskService.deleteById(id), HttpStatus.OK);
    }

    @GetMapping("/priorytety")
    public ResponseEntity<Set<String>> findAllPriorytety() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Normalny", "Ważny", "Bardzo ważny")), HttpStatus.OK);
    }

    @GetMapping("/statusy")
    public ResponseEntity<Set<String>> findAllStatusy() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Nie rozpoczęty", "Rozpoczęty", "Skończony")), HttpStatus.OK);
    }

}
