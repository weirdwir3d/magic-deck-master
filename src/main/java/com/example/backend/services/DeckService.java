package com.example.backend.services;

import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.repositories.DeckRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeckService {
    private final DeckRepository deckRepository;

    public DeckService(DeckRepository deckRepository){
        this.deckRepository = deckRepository;
    }


    public List<Deck> getAllDecks(){
        return deckRepository.findAll();
    }

    public Deck saveDeck(Deck deck){
        return deckRepository.save(deck);
    }
}
