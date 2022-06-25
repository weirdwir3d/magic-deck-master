package com.example.backend.controllers;

import com.example.backend.entities.Card;
import com.example.backend.entities.Deck;
import com.example.backend.services.CardService;
import com.example.backend.services.DeckService;
import com.example.backend.entities.views.Views;
import com.example.backend.services.JoinDeckCardService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/decks")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class DeckController {
    private final DeckService deckService;
    private final CardService cardService;

    private final JoinDeckCardService joinDeckCardService;

    public DeckController(DeckService deckService, CardService cardService, JoinDeckCardService joinDeckCardService){
        this.deckService = deckService;
        this.cardService = cardService;
        this.joinDeckCardService = joinDeckCardService;
    }

//    @GetMapping
//    @JsonView(Views.DecksView.class)
//    public List<Deck> getAll(){
//        return deckService.getAllDecks();
//    }

//    @GetMapping("/{id}")
//    @JsonView(Views.DecksView.class)
//    public Deck getDeck(@PathVariable long id){
//        Optional<Deck> deck = deckService.findDeck(id);
//        return deck.orElse(null);
//    }

//    @GetMapping("/search")
//    @JsonView(Views.DecksView.class)
//    public List<Deck> getDecks(@RequestParam String name) {
//        return deckService.findAllByName(name);
//    }

//    @PostMapping()
//    public Deck save(@RequestBody Deck deck) {
//        return deckService.saveDeck(deck);
//    }

//    @GetMapping("{id}/cards")
//    public Set<Card> getCardsForDeck(@PathVariable Long id) {
//        return getDeck(id).getCards();
//    }

//    @PutMapping("users/{username}/cards/{card_id}/decks/{deck_id}")
//    public Card addCardForDeck(@PathVariable Long card_id, @PathVariable deck_id){
////        try{
////            //somestuff
////        }catch()
//        return null;
//    }

//    @DeleteMapping("/{id}")
//    public void deleteDeck(@PathVariable Long id){
//        deckService.deleteDeck(getDeck(id));
//    }

//    @PutMapping("/{deckId}/cards/{cardId}")
//    public void addCardToDeck(@PathVariable Long deckId, @PathVariable Long cardId){
//        try {
//            joinDeckCardService.joinDeckAndCard(deckId, cardId);
//        } catch (EntityNotFoundException enfe){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, enfe.getMessage());
//        }
//    }

//    @DeleteMapping("/{deckId}/cards/{cardId}")
//    public void removeCardFromDeck(@PathVariable Long deckId, @PathVariable Long cardId){
//        //
//    }
}
