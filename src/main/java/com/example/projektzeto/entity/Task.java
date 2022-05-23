package com.example.projektzeto.entity;



import javax.persistence.*;


@Entity
@Table(name = "tbl_task")
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String tytul;

    @Column(nullable = false)
    private String opis;

    @Column(nullable = false)
    private String typ;

    @Column(nullable = false)
    private String przydzielonoDla;

    @Column(nullable = false)
    private String deadline;

    @Column(nullable = false)
    private String firma;

    @Column(nullable = false)
    private String priorytety;

    @Column(nullable = false)
    private String statusy;

    public String getPriorytet() {
        return priorytety;
    }

    public void setPriorytet(String priorytety) {
        this.priorytety = priorytety;
    }

    public String getStatus() {
        return statusy;
    }

    public void setStatus(String statusy) {
        this.statusy = statusy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTytul() {
        return tytul;
    }

    public void setTytul(String tytul) {
        this.tytul = tytul;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getTyp() {
        return typ;
    }

    public void setTyp(String typ) {
        this.typ = typ;
    }

    public String getPrzydzielonoDla() {
        return przydzielonoDla;
    }

    public void setPrzydzielonoDla(String przydzielonoDla) {
        this.przydzielonoDla = przydzielonoDla;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getFirma() {
        return firma;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }
}
