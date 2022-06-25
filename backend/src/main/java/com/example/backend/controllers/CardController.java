package com.example.backend.controllers;

import com.example.backend.entities.Card;
import com.example.backend.services.CardService;
import com.example.backend.entities.views.Views;
import com.example.backend.services.JoinDeckCardService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class CardController {
    private final CardService cardService;

    private final JoinDeckCardService joinDeckCardService;

    public CardController(CardService cardService, JoinDeckCardService joinDeckCardService){
        this.cardService = cardService;
        this.joinDeckCardService = joinDeckCardService;
    }

//    @GetMapping
//    @JsonView(Views.CardsView.class)
//    public List<Card> getAllCards(){
//        return cardService.getCards();
//    }

//    @GetMapping("/{id}")
//    @JsonView(Views.CardsView.class)
//    public Card getCard(@PathVariable long id){
//        try {
//            return cardService.getCard(id);
//        } catch (EntityNotFoundException enfe){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found");
//        }
//    }

//    @GetMapping("/search")
//    @JsonView(Views.CardsView.class)
//    public List<Card> getCards(@RequestParam String name) {
//        return cardService.findAllByName(name);
//    }

    //TODO: what about this?
    @PostMapping()
    public Card save(@RequestBody Card card) {
        return cardService.saveCard(card);
    }

    @DeleteMapping("/{cardId}/decks/{deckId}")
    public void deleteCardFromDeck(@PathVariable Long cardId, @PathVariable Long deckId){
        try {
            joinDeckCardService.joinDeckAndCard(deckId, cardId);
        } catch(EntityNotFoundException enfe){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, enfe.getMessage());
        }
    }
}
