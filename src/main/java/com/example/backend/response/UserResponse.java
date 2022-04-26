package com.example.backend.response;

public class UserResponse {
    public Long id;
    public String userName;
    public String firstName;
    public String lastName;
    public String email;
    public String phoneNumber;

    public UserResponse(Long id, String userName, String firstName, String lastName, String email, String phoneNumber) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}