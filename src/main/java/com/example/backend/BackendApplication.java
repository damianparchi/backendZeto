package com.example.backend;

import com.example.backend.entities.Authority;
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
        List<Authority> authorityList = new ArrayList<>();

        authorityList.add(createAuthority("ADMIN","Admin role"));


        User adminUser = new User();

        adminUser.setUserName("admin");
        adminUser.setFirstName("admin");
        adminUser.setLastname("adminowski");
        adminUser.setPassword(passwordEncoder.encode("admin"));
        adminUser.setEnabled(true);
        adminUser.setAuthorities(authorityList);

        userDetailsRepository.save(adminUser);

    }

    @PostConstruct
    protected void initUser() {
        List<Authority> authorityList = new ArrayList<>();

        authorityList.add(createAuthority("USER","User role"));
        User user = new User();

        user.setUserName("parchi");
        user.setFirstName("damian");
        user.setLastname("parchi");
        user.setPassword(passwordEncoder.encode("damian123"));
        user.setEnabled(true);
        user.setAuthorities(authorityList);

        userDetailsRepository.save(user);
    }

    private Authority createAuthority(String roleCode, String roleDescription) {
        Authority authority = new Authority();
        authority.setRoleCode(roleCode);
        authority.setRoleDescription(roleDescription);
        return authority;
    }

	@GetMapping("/path")
	public List<String> home(){
		return List.of("Hello","World");

	}

	@RequestMapping(value = "/test/postmethod", method = RequestMethod.POST, consumes = "application/json")
	public String getData(@RequestBody Employee employee) {
		return "Imie pracownika: " +employee.getFirst_name() + "\nNazwisko pracownika: " + employee.getLast_name() + "\nlogin pracownika " + employee.getLogin() + "\nhasło pracownika: " + employee.getPassword();
	}

}
