package com.example.backend.repositories;

import com.example.backend.entities.Card;
import com.example.backend.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {
    @Override
    List<Card> findAll();

    public List<Card> findAllByName(String name);

    public List<Card> findCardsByUserAndName(User user, String name);

}
