package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
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
