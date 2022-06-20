package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;

    @Column(name = "color_1")
    private String color1;

    @Column(name = "color_2")
    private String color2;
    private int toughness;

    @Column(name = "mana_cost_1")
    private int manaCost1;

    @Column(name = "mana_cost_2")
    private int manaCost2;
    private String ability;
    private String description;

    @Column(name = "is_planeswalker")
    private boolean isPlanesWalker;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "has_circle")
    private boolean hasCircle;

    @Column(name = "has_square")
    private boolean hasSquare;

    @Column(name = "has_triangle")
    private boolean hasTriangle;

    @Column(name = "is_in_deck")
    private boolean isInDeck;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private User user;


    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
