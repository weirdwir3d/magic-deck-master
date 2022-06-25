package com.example.backend.controllers;

import com.example.backend.entities.Card;
import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.entities.views.Views;
import com.example.backend.services.CardService;
import com.example.backend.services.DeckService;
import com.example.backend.services.JoinDeckCardService;
import com.example.backend.services.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class UserController {
    private final UserService userService;
    private final DeckService deckService;
    private final CardService cardService;
    private final JoinDeckCardService joinDeckCardService;


    public UserController(UserService userService, DeckService deckService, CardService cardService, JoinDeckCardService joinDeckCardService){
        this.userService = userService;
        this.deckService = deckService;
        this.cardService = cardService;
        this.joinDeckCardService = joinDeckCardService;
    }

    //TODO: USERS
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username){
        Optional<User> user = userService.findUser(username);

        return user.orElse(null);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User addNewUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username can't be null or empty");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password can't be null or empty");
        }

        return this.userService.saveUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        System.out.println("Getting users");
        return this.userService.getAllUsers();
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username){
//        userService.deleteUser(getUser(username));
    }

    //TODO: CARDS
    //add a new card to user
    @PostMapping("{username}/cards")
    public Card addCardForUser(@PathVariable String username, @RequestBody Card card){
        User user = getUser(username);
        if (user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with username " + username + " was not found");
        }
        return cardService.addCardToUser(user, card);
    }

    //get all cards from user
    @GetMapping("{username}/cards")
    @JsonView(Views.CardsView.class)
    public List<Card> getCardsForUser(@PathVariable String username){
        return getUser(username).getCards();
    }

    //get a card from user
    @GetMapping("/{username}/cards/{card_id}")
    @JsonView(Views.CardsView.class)
    public Card getCard(@PathVariable String username, @PathVariable Long card_id){
        User user = getUser(username);
        try {
            return cardService.getCard(card_id);
        } catch (EntityNotFoundException enfe){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found");
        }
    }

    //search for card(s) in user by name
    @GetMapping("{username}/cards/search")
    @JsonView(Views.CardsView.class)
    public List<Card> getCards(@PathVariable String username, @RequestParam String name) {
        return getUser(username).findCards(name);
//        return cardService.findAllByName(name);
    }

    //TODO: doesnt work
    //put card to deck
    @PutMapping("{username}/cards/{card_id}/decks/{deck_id}/add-card")
    public void addCardForDeck(@PathVariable String username, @PathVariable Long card_id, @PathVariable Long deck_id){
        try {
            joinDeckCardService.joinDeckAndCard(deck_id, card_id);
        } catch (EntityNotFoundException enfe){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, enfe.getMessage());
        }
//        TODO: ...what to do?
//        return joinDeckCardService.joinDeckAndCard(deck_id, card_id);
    }

    //TODO: doesnt work
    //get all cards in a deck
    @GetMapping("{username}/decks/{deck_id}/cards")
    @JsonView(Views.CardsView.class)
    public Set<Card> getCardsForDeck(@PathVariable String username, @PathVariable Long deck_id) {
        return getDeckForUser(username, deck_id).getCards();
    }

    //delete card
    @DeleteMapping("/{username}/cards/{card_id}")
    public void deleteCard(@PathVariable String username, @PathVariable Long card_id){
        cardService.deleteCard(getCard(username, card_id));
    }

    //TODO: not wanting to deleting card completely, just removing from deck
    //delete card from deck
    @DeleteMapping("{username}/decks/{deck_id}/cards/{card_id}/delete-card")
    public void removeCardFromDeck(@PathVariable Long deckId, @PathVariable Long cardId){
        //
    }

    //TODO: DECKS
    //add a new deck to user
    @PostMapping("{username}/decks")
    public Deck addDeckForUser(@PathVariable String username, @RequestBody Deck deck){
        User user = getUser(username);
        if (user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with username " + username + " was not found");
        }
        return deckService.addDeckToUser(user, deck);
    }

    //get all decks for user
    @GetMapping("{username}/decks")
    @JsonView(Views.DecksView.class)
    public List<Deck> getDecksForUser(@PathVariable String username){
        return getUser(username).getDecks();
    }

    //get a deck from user
    @GetMapping("{username}/decks/{deck_id}")
    @JsonView(Views.DecksView.class)
    public Deck getDeckForUser(@PathVariable String username, @PathVariable long deck_id){
        Optional<Deck> deck = deckService.findDeck(deck_id);
        return deck.orElse(null);
    }

    //search for a deck in user
    @GetMapping("{username}/decks/search")
    @JsonView(Views.DecksView.class)
    public List<Deck> getDecks(@PathVariable String username, @RequestParam String name) {
        getDecksForUser(username);
        return deckService.findAllByName(name);
    }

    //delete deck
    @DeleteMapping("/{username}/decks/{deck_id}")
    public void deleteDeck(@PathVariable String username, @PathVariable Long deck_id){
        deckService.deleteDeck(getDeckForUser(username, deck_id));
    }

}
