package com.example.backend.controllers;

import com.example.backend.entities.Roles;
import com.example.backend.entities.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Controller
@RequestMapping(path = "/users")
public class UserController {
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addUser(@RequestParam String userName, @RequestParam String password,
                                        @RequestParam String firstName, @RequestParam String lastName,
                                        @RequestParam String email, @RequestParam String phoneNumber) {
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
            if(userDetailsRepository.findByUserName(userName) != null){
                return "Nieprawidłowa nazwa użytkownika";
            }
            List<Roles> rolesList = new ArrayList<>();
            rolesList.add(createUser());
            User user = new User();

            user.setUserName(userName);
            user.setFirstName(firstName);
            user.setLastname(lastName);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            user.setCreatedAt(new Date(System.currentTimeMillis()));
            user.setUpdatedAt(new Date(System.currentTimeMillis()));
            user.setPassword(passwordEncoder.encode(password));
            user.setEnabled(true);
            user.setRoles(rolesList);

            userDetailsRepository.save(user);
            return "Pomyślnie Utworzono Użytkownika";
        }
        return "Brak Autoryzacji";
    }

        @PostMapping(path = "/usun")
        public @ResponseBody String deleteUser(@RequestParam Long id){
            User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
                if(u.getId() == id){
                    return "Nie można usunąć własnego konta";
                }
                else if(id == 1){
                    return "Nie można usunąć głównego Administratora";
                }
                userDetailsRepository.deleteById(id);
                return "Usunięto użytkownika";
            }
            return "Brak Autoryzacji";
        }

        @PostMapping(path = "/edytuj")
        public @ResponseBody String editUser(@RequestParam(required = false) Long id,
                                             @RequestParam(required = false) String userName,
                                             @RequestParam(required = false) String password,
                                             @RequestParam(required = false) String firstName,
                                             @RequestParam(required = false) String lastName,
                                             @RequestParam(required = false) String email,
                                             @RequestParam(required = false) String phoneNumber){
            User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user;
            if (id != null){
                if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")){
                    user = userDetailsRepository.getById(id);
                }
                else {
                    user = userDetailsRepository.getById(u.getId());
                }
            }
            else{
                user = userDetailsRepository.getById(u.getId());
            }

            if(userName != null){
                if(userDetailsRepository.findByUserName(userName) != null){
                    return "Nazwa uzytkownika jest już zajęta";
                }
                user.setUserName(userName);
            }
            if (password != null){
                user.setPassword(passwordEncoder.encode(password));
            }
            if (firstName != null){
                user.setFirstName(firstName);
            }
            if (lastName != null){
                user.setLastname(lastName);
            }
            if (email != null){
                user.setEmail(email);
            }
            if(phoneNumber != null){
                user.setPhoneNumber(phoneNumber);
            }
            user.setUpdatedAt(new Date(System.currentTimeMillis()));
            userDetailsRepository.save(user);
            return "Pomyślnie zapisano zmiany";
        }

        @PostMapping(path = "/admin")
        public @ResponseBody String grantAdmin(@RequestParam Long id){
            User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
                List<Roles> rolesList = new ArrayList<>();
                rolesList.add(createAdmin());
                User user = userDetailsRepository.getById(id);
                user.setRoles(rolesList);
                userDetailsRepository.save(user);
                return "Nadano uprawnienia administratora";
            }
            return "Brak Autoryzacji";
        }

    @PostMapping(path = "/user")
    public @ResponseBody String grantUser(@RequestParam Long id){
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
            if(u.getId() == id){
                return "Nie można zdegradować swojego konta";
            }
            else if(id == 1){
                return "Nie można zdegradować głównego Administratora";
            }
            List<Roles> rolesList = new ArrayList<>();
            rolesList.add(createUser());
            User user = userDetailsRepository.getById(id);
            user.setRoles(rolesList);
            userDetailsRepository.save(user);
            return "Nadano uprawnienia usera";
        }
        return "Brak Autoryzacji";
    }

    @GetMapping(path = "/view")
    private @ResponseBody List<User> viewUsers(@RequestParam(required = false) Long id){
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
            if(id != null){
                ArrayList<User> users = new ArrayList<>();
                userDetailsRepository.findById(id).ifPresent(users::add);
                return users;
            }
            return userDetailsRepository.findAll();
        }
        return null;
    }

    private Roles createUser() {
        Roles role = roleRepository.findByRoleCode("USER");
        if(role == null){
            role = new Roles();
            role.setRoleCode("USER");
            role.setRoleDescription("User Role");
            return role;
        }
        return role;
    }

    private Roles createAdmin() {
        Roles role = roleRepository.findByRoleCode("ADMIN");
        if(role == null){
            role = new Roles();
            role.setRoleCode("ADMIN");
            role.setRoleDescription("Admin role");
            return role;
        }
        return role;
    }


}
