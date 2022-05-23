package com.example.projektzeto;

import com.example.projektzeto.service.IRoleService;
import com.example.projektzeto.utils.ConstantUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.projektzeto.entity.Task;
import com.example.projektzeto.entity.Role;
import com.example.projektzeto.entity.User;
import com.example.projektzeto.service.IService;

@SpringBootApplication
public class ProjektZetoApplication implements CommandLineRunner {

    @Autowired
    private IService<Task> taskService;
    @Autowired
    private IService<User> userService;
    @Autowired
    private IRoleService<Role> roleService;


    public static void main(String[] args) {
        SpringApplication.run(ProjektZetoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if(roleService.findAll().isEmpty()) {
            roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
            roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
        }

        if(userService.findAll().isEmpty()) {
            User user1 = new User();
            user1.setEmail("test@user.com");
            user1.setName("Test User");
            user1.setMobile("9787456545");
            user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
            user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
            userService.saveOrUpdate(user1);

            User user2 = new User();
            user2.setEmail("test@admin.com");
            user2.setName("Test Admin");
            user2.setMobile("9787456545");
            user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
            user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
            userService.saveOrUpdate(user2);
        }

        if(taskService.findAll().isEmpty()) {
            for (int i = 1; i<= 1000; i++) {
                Task task = new Task();
                task.setTytul("Spring Microservices in Action");
                task.setOpis("John Carnell");
                task.setTyp("typ1");
                task.setPrzydzielonoDla("Adam");
                task.setDeadline("20 marzec");
                task.setFirma("Workbuild IT");
                task.setPriorytet("Normalny");
                task.setStatus("Rozpoczęty");


                taskService.saveOrUpdate(task);
            }

        }

    }

}
