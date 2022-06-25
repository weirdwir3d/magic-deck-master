package com.example.backend.entities;

import com.example.backend.entities.views.Views;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.AllViews.class)
    @Column(name = "card_id")
    private Long id;

    @JsonView(Views.AllViews.class)
    private String name;

    @JsonView(Views.AllViews.class)
    private String type;

    @Column(name = "color_1")
    @JsonView(Views.AllViews.class)
    private String color1;

    @Column(name = "color_2")
    @JsonView(Views.AllViews.class)
    private String color2;

    @JsonView(Views.AllViews.class)
    private int toughness;

    @Column(name = "mana_cost_1")
    @JsonView(Views.AllViews.class)
    private int manaCost1;

    @Column(name = "mana_cost_2")
    @JsonView(Views.AllViews.class)
    private int manaCost2;

    @JsonView(Views.AllViews.class)
    private String ability;

    @JsonView(Views.AllViews.class)
    private String description;

    @Column(name = "is_planeswalker")
    @JsonView(Views.AllViews.class)
    private boolean isPlanesWalker;

    @Column(name = "image_path")
    @JsonView(Views.AllViews.class)
    private String imagePath;

    @Column(name = "isFavorite_card")
    @JsonView(Views.AllViews.class)
    private boolean isFavorite_card;

    @ManyToMany(mappedBy = "cards")
    @JsonView(Views.CardsView.class)
    private Set<Deck> inDeck;

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

    public Set<Deck> getInDeck() {
        return inDeck;
    }

    public void setInDecks(Set<Deck> inDeck) {
        this.inDeck = inDeck;
    }

}
