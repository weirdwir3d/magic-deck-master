package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "nr_cards")
    private int nrOfCards;

    @Column(name = "nr_spells")
    private int nrOfSpells;

    @Column(name = "nr_permanents")
    private int nrOfPermanents;

    @Column(name = "has_planeswalker")
    private boolean hasPlanesWalker;

    @Column(name = "is_favorite")
    private boolean isFavorite;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "last_edited")
    private LocalDateTime lastEdited;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private User user;


    public void setUser(User user){
        this.user = user;
    }
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
