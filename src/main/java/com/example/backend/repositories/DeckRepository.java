package com.example.backend.repositories;

import com.example.backend.entities.Deck;
import com.example.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepository extends CrudRepository<Deck, Long> {
    @Override
    List<Deck> findAll();
}
