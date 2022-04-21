package com.example.backend.controllers;

import com.example.backend.entities.Roles;
import com.example.backend.entities.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserDetailsRepository;
import com.example.backend.requests.PasswordChange;
import com.example.backend.requests.RegisterForm;
import com.example.backend.response.UserResponse;
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
    public @ResponseBody String addUser(@RequestBody RegisterForm registerForm) {
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
            if(userDetailsRepository.findByUserName(registerForm.getUserName()) != null){
                return "Nieprawidłowa nazwa użytkownika";
            }
            List<Roles> rolesList = new ArrayList<>();
            rolesList.add(createUser());
            User user = new User();

            user.setUserName(registerForm.getUserName());
            user.setFirstName(registerForm.getFirstName());
            user.setLastname(registerForm.getLastName());
            user.setEmail(registerForm.getEmail());
            user.setPhoneNumber(registerForm.getPhoneNumber());
            user.setCreatedAt(new Date(System.currentTimeMillis()));
            user.setUpdatedAt(new Date(System.currentTimeMillis()));
            user.setPassword(passwordEncoder.encode(registerForm.getPassword()));
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

        @PostMapping(path = "/haslo")
        public @ResponseBody String changePassword(@RequestBody PasswordChange passwordChange,
                                                   @RequestParam(required = false) Long id){
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

            if(Objects.equals(passwordChange.getPassword(), "")){
                return "Hasło nie może być puste";
            }
            user.setPassword(passwordEncoder.encode(passwordChange.getPassword()));
            userDetailsRepository.save(user);
            return "Hasło zmienione pomyślnie";
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
    private @ResponseBody List<UserResponse> viewUsers(@RequestParam(required = false) Long id){
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ArrayList<UserResponse> users = new ArrayList<>();
        if(u.getAuthorities().iterator().next().getAuthority().equals("ADMIN")) {
            if(id != null){
                User user = userDetailsRepository.getById(id);
                users.add(new UserResponse(user.getId(), user.getUserName(), user.getFirstName(),
                        user.getLastname(), user.getEmail(), user.getPhoneNumber()));
                return users;
            }
            List<User> lista = userDetailsRepository.findAll();
            for(User user: lista){
                users.add(new UserResponse(user.getId(), user.getUserName(), user.getFirstName(),
                        user.getLastname(), user.getEmail(), user.getPhoneNumber()));
            }
            return users;
        }
        User user = userDetailsRepository.getById(u.getId());
        users.add(new UserResponse(user.getId(), user.getUserName(), user.getFirstName(),
                user.getLastname(), user.getEmail(), user.getPhoneNumber()));
        return users;
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
