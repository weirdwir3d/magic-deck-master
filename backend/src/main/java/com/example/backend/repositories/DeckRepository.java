package com.example.backend.repositories;

import com.example.backend.entities.Deck;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepository extends CrudRepository<Deck, Long> {
    @Override
    List<Deck> findAll();

    public List<Deck> findDecksByName(String name);
}
