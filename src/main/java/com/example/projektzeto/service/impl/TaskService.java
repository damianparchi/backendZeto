package com.example.projektzeto.service.impl;

import com.example.projektzeto.service.IPageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projektzeto.entity.Task;
import com.example.projektzeto.repository.TaskRepository;
import com.example.projektzeto.service.IService;

import java.util.Collection;
import java.util.Optional;


@Service
public class TaskService implements IService<Task>, IPageService<Task> {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Collection<Task> findAll() {
        return (Collection<Task>) taskRepository.findAll();
    }

    @Override
    public Page<Task> findAll(Pageable pageable, String searchText) {
        return taskRepository.findAllTasks(pageable, searchText);
    }

    @Override
    public Page<Task> findAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    @Override
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task saveOrUpdate(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            taskRepository.deleteById(id);
            jsonObject.put("message", "Task usunięty pomyślnie");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
