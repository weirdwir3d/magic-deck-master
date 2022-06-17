package com.example.backend.controllers;

import com.example.backend.entities.Card;
import com.example.backend.entities.User;
import com.example.backend.services.CardService;
import com.example.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/*@RestController
@RequestMapping("/cards")*/
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService){
        this.cardService = cardService;
    }


    //@GetMapping
    public List<Card> getAllUsers() {
        return this.cardService.getCards();
    }

    //@PostMapping
    //@ResponseStatus(HttpStatus.CREATED)
    public Card addNewCard(@RequestBody Card card) {
        if (card.getName() == null || card.getName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card name can't be null or empty");
        }

        return this.cardService.saveCard(card);
    }
}
