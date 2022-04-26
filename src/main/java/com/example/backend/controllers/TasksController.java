package com.example.backend.controllers;


import com.example.backend.entities.Tasks;
import com.example.backend.entities.User;
import com.example.backend.repositories.TasksRepository;
import com.example.backend.repositories.UserDetailsRepository;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path = "/zadania")
public class TasksController {
    @Autowired
    private TasksRepository tasksRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addTask(@RequestParam Long userId, @RequestParam int year, @RequestParam int month,
                                        @RequestParam int day, @RequestParam int hour, @RequestParam int minutes,
                                        @RequestParam String title, @RequestParam String description){
        User admin = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(admin.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(LocalDateTime.of(year,month,day,hour,minutes).isBefore(LocalDateTime.now())){
                return "Data nie może być wstecz";
            }
            Tasks task = new Tasks();
            task.setIdUser(userId);
            task.setIdAdmin(admin.getId());
            task.setCreated(LocalDateTime.now());
            task.setDeadline(LocalDateTime.of(year,month,day,hour,minutes));
            task.setTitle(title);
            task.setDescription(description);
            task.setDone(false);
            tasksRepository.save(task);
            return "Pomyślnie Dodano zadanie";
        }
        return "Brak Autoryzacji";
    }

    @GetMapping(path = "/view")
    public @ResponseBody List<Tasks> viewTasks(@RequestParam(required = false) Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(id != null){
                return tasksRepository.findByIdUser(id);
            }
            return tasksRepository.findAll();
        }
        return tasksRepository.findByIdUser(user.getId());
    }

    @PostMapping(path = "/edit")
    public @ResponseBody String editTask(@RequestParam Long id,
                                         @RequestParam Long userId,
                                         @RequestParam int year,
                                         @RequestParam int month,
                                         @RequestParam int day,
                                         @RequestParam int hour,
                                         @RequestParam int minutes,
                                         @RequestParam String title,
                                         @RequestParam String description){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            Tasks task = tasksRepository.getById(id);
            task.setIdUser(userId);
            task.setDeadline(LocalDateTime.of(year,day,month,hour,minutes));
            task.setTitle(title);
            task.setDescription(description);
            tasksRepository.save(task);
            return "Edytowano Pomyślnie";
        }
        return "Brak Autoryzacji";
    }

    @PostMapping(path = "/zakoncz")
    public @ResponseBody String endTask(@RequestParam Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Tasks task = tasksRepository.getById(id);
        if(user.getAuthorities().iterator().next().getAuthority().equals("USER")){
            if(user.getId() != task.getIdUser()){
                return "Brak Autoryzacji";
            }
        }
        if (task.isDone()){
            return "Zadanie jest już zakończone";
        }
        else{
            task.setDone(true);
            tasksRepository.save(task);
            return "Zadanie zakończone pomyślnie";
        }
    }

    @GetMapping(path = "/view/otwarte")
    public @ResponseBody List<Tasks> viewOpen(@RequestParam(required = false) Long userId){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(userId != null){
                return tasksRepository.findByIdUserAndDone(userId, false);
            }
            return tasksRepository.findByDone(false);
        }
        return tasksRepository.findByIdUserAndDone(user.getId(),false);
    }

    @GetMapping(path = "/view/zamkniete")
    public @ResponseBody List<Tasks> viewClosed(@RequestParam(required = false) Long userId){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(userId != null){
                return tasksRepository.findByIdUserAndDone(userId, true);
            }
            return tasksRepository.findByDone(true);
        }
        return tasksRepository.findByIdUserAndDone(user.getId(),true);
    }

    @PostMapping(path = "/usun")
    public @ResponseBody String deleteTask(@RequestParam Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            tasksRepository.deleteById(id);
            return "Usunieto pomyślnie";
        }
        return "Brak Autoryzacji";
    }
}