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
    private LocalDateTime startedNew;
    private LocalDateTime endedNew;
    private String reason;


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

    public LocalDateTime getStartedNew() { return startedNew; }

    public void setStartedNew(LocalDateTime startedNew) { this.startedNew = startedNew; }

    public LocalDateTime getEndedNew() { return endedNew; }

    public void setEndedNew(LocalDateTime endedNew) { this.endedNew = endedNew; }

    public void setReason(String reason) { this.reason = reason; }

    public String getReason() { return reason; }
}
