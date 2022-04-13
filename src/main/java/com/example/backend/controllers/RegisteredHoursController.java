package com.example.backend.controllers;

import com.example.backend.entities.RegisteredHours;
import com.example.backend.entities.User;
import com.example.backend.repositories.RegisteredHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping(path = "/registeredhours")
public class RegisteredHoursController {
    @Autowired
    private RegisteredHoursRepository registeredHoursRepository;


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

    @GetMapping(path = "/zmiany/view")
    public @ResponseBody Iterable<RegisteredHours> viewRequestedChanges(@RequestParam(required = false) Long userId){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(userId != null){
                return registeredHoursRepository.findByIdUserAndStartedNewIsNotNull(userId);
            }
            return registeredHoursRepository.findByStartedNewIsNotNull();
        }
        return registeredHoursRepository.findByIdUserAndStartedNewIsNotNull(user.getId());
    }


    @PostMapping(path = "/zmiany/dodaj")
    public @ResponseBody String addChanges(@RequestParam Long id, @RequestParam int startedy, @RequestParam int startedm,
                                           @RequestParam int startedd, @RequestParam int startedh, @RequestParam int startedmin,
                                           @RequestParam int endedy, @RequestParam int endedm, @RequestParam int endedd,
                                           @RequestParam int endedh, @RequestParam int endedmin,
                                           @RequestParam(required = false) String reason)
    {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            Optional<RegisteredHours> search = registeredHoursRepository.findById(id);
            if(search.isPresent()){
                RegisteredHours hours = search.get();
                hours.setStarted(LocalDateTime.of(startedy,startedm,startedd,startedh,startedmin));
                hours.setEnded(LocalDateTime.of(endedy,endedm,endedd,endedh,endedmin));
                registeredHoursRepository.save(hours);
                return "Zmieniono godziny";
            }
        }
        List<RegisteredHours> search = registeredHoursRepository.findByIdAndIdUser(id, user.getId());
        if(search.size() > 0){
            RegisteredHours hours = search.get(0);
            hours.setStartedNew(LocalDateTime.of(startedy,startedm,startedd,startedh,startedmin));
            hours.setEndedNew(LocalDateTime.of(endedy,endedm,endedd,endedh,endedmin));
            hours.setReason(reason);
            registeredHoursRepository.save(hours);
            return "Wysłano proźbę zmiany";
        }
        else{ return "Wystąpił błąd";}
    }

    @PostMapping(path = "/zmiany/akceptuj")
    public @ResponseBody String acceptChanges (@RequestParam Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            Optional<RegisteredHours> hours = registeredHoursRepository.findById(id);
            if(hours.isPresent()){
                RegisteredHours hour = hours.get();
                hour.setStarted(hour.getStartedNew());
                hour.setEnded(hour.getEndedNew());
                hour.setEndedNew(null);
                hour.setStartedNew(null);
                hour.setReason(null);
                registeredHoursRepository.save(hour);
                return "Zatwierdzono pomyślnie";
            }
            return "Złe Id";
        }
        return "Brak Autoryzacji";
    }

    @PostMapping(path = "/zmiany/odrzuc")
    public @ResponseBody String rejectChanges (@RequestParam Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            Optional<RegisteredHours> hours = registeredHoursRepository.findById(id);
            if(hours.isPresent()){
                RegisteredHours hour = hours.get();
                hour.setEndedNew(null);
                hour.setStartedNew(null);
                hour.setReason(null);
                registeredHoursRepository.save(hour);
                return "Odrzucono zmiany";
            }
            return "Złe Id";
        }
        return "Brak Autoryzacji";
    }


    @GetMapping(path = "/view")
    public @ResponseBody
    List<RegisteredHours> viewAllHours(@RequestParam(required = false) Long userId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            if(userId != null){
                return registeredHoursRepository.findByIdUser(userId);
            }
            return registeredHoursRepository.findAll();
        }
        return registeredHoursRepository.findByIdUser(user.getId());
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String deleteHours(@RequestParam Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
            registeredHoursRepository.deleteById(id);
            return "Usunięto pomyślnie";
        }
        else{
            return "Brak Autoryzacji";
        }
    }
}
