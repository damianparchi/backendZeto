package com.example.backend;

import com.example.backend.entities.Roles;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RestController
@SpringBootApplication
public class BackendApplication {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    @PostConstruct
    protected void initAdmin() {
        List<Roles> rolesList = new ArrayList<>();

        rolesList.add(createRole("ADMIN","Admin role"));


        User adminUser = new User();

        adminUser.setUserName("admin");
        adminUser.setFirstName("admin");
        adminUser.setLastname("adminowski");
        adminUser.setPassword(passwordEncoder.encode("admin"));
        adminUser.setEnabled(true);
        adminUser.setRoles(rolesList);

        userDetailsRepository.save(adminUser);

    }

    @PostConstruct
    protected void initUser() {
        List<Roles> rolesList = new ArrayList<>();

        rolesList.add(createRole("USER","User role"));
        User user = new User();

        user.setUserName("parchi");
        user.setFirstName("damian");
        user.setLastname("parchi");
        user.setPassword(passwordEncoder.encode("damian123"));
        user.setEnabled(true);
        user.setRoles(rolesList);

        userDetailsRepository.save(user);
    }

    private Roles createRole(String roleCode, String roleDescription) {
        Roles roles = new Roles();
        roles.setRoleCode(roleCode);
        roles.setRoleDescription(roleDescription);
        return roles;
    }


}
