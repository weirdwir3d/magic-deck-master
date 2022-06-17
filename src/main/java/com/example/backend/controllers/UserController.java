package com.example.backend.controllers;

import com.example.backend.entities.Card;
import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import com.example.backend.services.CardService;
import com.example.backend.services.DeckService;
import com.example.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final DeckService deckService;
    private final CardService cardService;


    public UserController(UserService userService, DeckService deckService, CardService cardService){
        this.userService = userService;
        this.deckService = deckService;
        this.cardService = cardService;
    }

    //add a card
    @PostMapping("{username}/cards")
    public Card addCardForUser(@PathVariable String username, @RequestBody Card card){
        User user = getUser(username);
        System.out.println("THERE ARE THIS MANY USERS: " + userService.getAllUsers().size());
        if (user == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with username " + username + " was not found");
        }

        return cardService.addCardToUser(user, card);
    }

    @GetMapping("{username}/cards")
    public List<Card> getCardsForUser(@PathVariable String username){
        return getUser(username).getCards();
    }

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
        return this.userService.getAllUsers();
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username){
//        userService.deleteUser(getUser(username));
    }

}
