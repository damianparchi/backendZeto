package com.example.backend.controllers;

import com.example.backend.entities.RegisteredHours;
import com.example.backend.entities.User;
import com.example.backend.repositories.RegisteredHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.Entity;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Controller
@RequestMapping(path = "/registeredhours")
public class RegisteredHoursController {
    @Autowired
    private RegisteredHoursRepository registeredHoursRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping(path = "/register")
    public @ResponseBody String registerHours (){
        RegisteredHours hours;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<RegisteredHours> search = registeredHoursRepository.findByIdUserAndEndedIsNull(user.getId());
        if(search.size() > 0){
            hours = search.get(0);
            hours.setEnded(LocalDateTime.now());
            registeredHoursRepository.save(hours);
            long seconds = (ChronoUnit.SECONDS.between(hours.getStarted(),hours.getEnded()) % 60);
            long minutes = (ChronoUnit.MINUTES.between(hours.getStarted(),hours.getEnded()) % 60);
            long h = (ChronoUnit.HOURS.between(hours.getStarted(),hours.getEnded()));
            return "Zakończono godziny pracy, czas pracy: " + h + "h, " + minutes + "m, " + seconds + "s";
        }
        else {
            hours = new RegisteredHours();
            hours.setIdUser(user.getId());
            hours.setStarted(LocalDateTime.now());
            registeredHoursRepository.save(hours);
            return "Rozpoczęto godziny pracy";
        }



    }

    @GetMapping(path = "/view")
    public @ResponseBody Iterable<RegisteredHours> viewAllHours() {
        return registeredHoursRepository.findAll();
    }
}
