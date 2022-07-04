package com.example.backend.services;

import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.repositories.DeckRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeckService {
    private final DeckRepository deckRepository;

    public DeckService(DeckRepository deckRepository){
        this.deckRepository = deckRepository;
    }

    public Deck addDeckToUser(User user, Deck deck){
//        user.getDecks().add(deck);
        deck.setUser(user);
        return deckRepository.save(deck);
    }
    public List<Deck> getAllDecks(){
        return deckRepository.findAll();
    }

    public Optional<Deck> findDeck(long id){
        return deckRepository.findById(id);
    }

    public Deck saveDeck(Deck deck){
        return deckRepository.save(deck);
    }

    public List<Deck> findAllByName(String name){
        return deckRepository.findDecksByName(name);
    }

    public void deleteDeck(Deck deck){
        deckRepository.delete(deck);
    }
}
