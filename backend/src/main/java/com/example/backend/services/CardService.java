package com.example.backend.services;

import com.example.backend.entities.Card;
import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.repositories.CardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository){
        this.cardRepository = cardRepository;
    }

    public Card addCardToUser(User user, Card card){
        card.setUser(user);
        return cardRepository.save(card);
    }

    public Card addCardToDeck(Deck deck, Card card){
        card.getInDeck().add(deck);
        return cardRepository.save(card);
    }

    public Card getCard(long id) {
        return cardRepository.findById(id).orElse(null);
    }
    public List<Card> getCards(){
        return cardRepository.findAll();
    }

    public Card saveCard(Card card){
        return cardRepository.save(card);
    }

    public List<Card> findAllByName(String name) {
        return cardRepository.findAllByName(name);
    }

    public void deleteCard(Card card){
        cardRepository.delete(card);
    }
}
