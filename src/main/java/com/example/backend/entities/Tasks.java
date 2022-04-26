package com.example.backend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Long idUser;
    private Long idAdmin;
    private LocalDateTime created;
    private LocalDateTime deadline;
    private String title;
    private String description;
    private boolean done;

    public long getId() {return id;}

    public Long getIdUser() {return idUser;}

    public void setIdUser(Long idUser) {this.idUser = idUser;}

    public Long getIdAdmin() {return idAdmin;}

    public void setIdAdmin(Long idAdmin) {this.idAdmin = idAdmin;}

    public LocalDateTime getCreated() {return created;}

    public void setCreated(LocalDateTime created) {this.created = created;}

    public LocalDateTime getDeadline() {return deadline;}

    public void setDeadline(LocalDateTime deadline) {this.deadline = deadline;}

    public String getTitle() {return title;}

    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public boolean isDone() {return done;}

    public void setDone(boolean done) {this.done = done;}
}
