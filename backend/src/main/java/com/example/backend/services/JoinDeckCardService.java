package com.example.backend.services;

import com.example.backend.entities.Card;
import com.example.backend.entities.Deck;
import com.example.backend.repositories.DeckRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class JoinDeckCardService {
    private DeckService deckService;
    private CardService cardService;
    private DeckRepository deckRepository;

    public JoinDeckCardService(DeckService deckService, CardService cardService, DeckRepository deckRepository){
        this.deckService = deckService;
        this.cardService = cardService;
        this.deckRepository = deckRepository;
    }

    public Card joinDeckAndCard(Long deckId, Long cardId){
        Deck deck = deckService.findDeck(deckId).orElse(null);
        if (deck == null){
            throw new EntityNotFoundException("Deck not found");
        }
        Card card = cardService.getCard(cardId);
        if (card == null){
            throw new EntityNotFoundException("Card not found");
        }
        deck.addCard(card);
        this.deckRepository.save(deck);
        return card;
    }

    public void removeDeckFromCard(Long deckId, Long cardId){
        Deck deck = deckService.findDeck(deckId).orElseThrow();
        Card card = cardService.getCard(cardId);

        deck.removeCard(card);
        this.deckRepository.save(deck);
    }
}
