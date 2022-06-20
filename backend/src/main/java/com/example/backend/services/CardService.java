package com.example.backend.services;

import com.example.backend.entities.Card;
import com.example.backend.entities.User;
import com.example.backend.repositories.CardRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Card> getCards(){
        return cardRepository.findAll();
    }

    public Card saveCard(Card card){
        return cardRepository.save(card);
    }
}
