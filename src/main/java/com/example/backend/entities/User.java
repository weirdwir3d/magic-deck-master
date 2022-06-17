package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Card> cards;

    public List<Card> getCards() {
        return cards;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
