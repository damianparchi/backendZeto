package com.example.backend;

import com.example.backend.controllers.UserController;
import com.example.backend.entities.Roles;
import com.example.backend.entities.User;
import com.example.backend.repositories.RegisteredHoursRepository;
import com.example.backend.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@SpringBootApplication(scanBasePackages={
        "com.example.backend.services"})
public class BackendApplication {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private RegisteredHoursRepository registeredHoursRepository;

    @Autowired
    private UserController userController;

    private void initFirstAdmin(PasswordEncoder passwordEncoder){
        List<Roles> rolesList = new ArrayList<>();
        Roles role = new Roles();
        role.setRoleCode("ADMIN");
        role.setRoleDescription("Admin role");
        rolesList.add(role);
        User user = new User();
        user.setUserName("admin");
        user.setFirstName("admin");
        user.setLastname("admin");
        user.setEmail("admin");
        user.setPhoneNumber("admin");
        user.setCreatedAt(new Date(System.currentTimeMillis()));
        user.setUpdatedAt(new Date(System.currentTimeMillis()));
        user.setPassword(passwordEncoder.encode("admin"));
        user.setEnabled(true);
        user.setRoles(rolesList);

        userDetailsRepository.save(user);
    }

    @PostConstruct
    protected void check(){
        if((userDetailsRepository == null)||(userDetailsRepository.findAll().size() == 0)){
            initFirstAdmin(passwordEncoder);
        }
    }


    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }




}