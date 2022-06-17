package com.example.backend.controllers;

import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.services.CardService;
import com.example.backend.services.DeckService;
import com.example.backend.services.UserService;
import org.apache.catalina.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/*@RestController
@RequestMapping("/decks")*/
public class DeckController {
    private final DeckService deckService;
    private final CardService cardService;

    public DeckController(DeckService deckService, CardService cardService){
        this.deckService = deckService;
        this.cardService = cardService;
    }


    //@GetMapping
    public List<Deck> getAllDecks() {
        return this.deckService.getAllDecks();
    }

    /*@PostMapping
    @ResponseStatus(HttpStatus.CREATED)*/
    public Deck addNewDeck(@RequestBody Deck deck) {
        if (deck.getName() == null || deck.getName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Deck name can't be null or empty");
        }

        return this.deckService.saveDeck(deck);
    }
}
