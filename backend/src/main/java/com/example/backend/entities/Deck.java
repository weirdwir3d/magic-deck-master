package com.example.backend.entities;

import com.example.backend.entities.views.Views;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Entity
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.AllViews.class)
    @Column(name = "deck_id")
    private Long id;

    @JsonView(Views.AllViews.class)
    private String name;

    @Column(name = "nr_cards")
    @JsonView(Views.AllViews.class)
    private int nrOfCards;

    @Column(name = "nr_spells")
    @JsonView(Views.AllViews.class)
    private int nrOfSpells;

    @Column(name = "nr_permanents")
    @JsonView(Views.AllViews.class)
    private int nrOfPermanents;

    @Column(name = "has_planeswalker")
    @JsonView(Views.AllViews.class)
    private boolean hasPlanesWalker;

    @Column(name = "is_favorite")
    @JsonView(Views.AllViews.class)
    private boolean isFavorite;

    @Column(name = "creation_date")
    @JsonView(Views.AllViews.class)
    private LocalDateTime creationDate;

    @Column(name = "last_edited")
    @JsonView(Views.AllViews.class)
    private LocalDateTime lastEdited;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToMany
    @JoinTable(
            name = "deck_card",
            joinColumns = @JoinColumn(name = "deck_id"),
            inverseJoinColumns = @JoinColumn(name = "card_id")
    )
    @JsonView(Views.DecksView.class)
    private Set<Card> cards;

    @JsonView(Views.DecksView.class)
    public int getNumCards(){
        if(cards == null){
            return 0;
        }
        return cards.size();
    }

    public void addCard(Card card){
        cards.add(card);
    }

    public void removeCard(Card card){
        cards.remove(card);
    }

    public Set<Card> getCards(){
        return cards;
    }

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
