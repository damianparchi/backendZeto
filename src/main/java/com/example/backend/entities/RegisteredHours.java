package com.example.backend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class RegisteredHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private long idUser;
    private LocalDateTime started;
    private LocalDateTime ended;


    public long getId() {
        return id;
    }

    public long getIdUser() {
        return idUser;
    }

    public LocalDateTime getStarted() {
        return started;
    }

    public LocalDateTime getEnded() {
        return ended;
    }

    public void setId(long id) { this.id = id; }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public void setStarted(LocalDateTime started) {
        this.started = started;
    }

    public void setEnded(LocalDateTime ended) {
        this.ended = ended;
    }
}
