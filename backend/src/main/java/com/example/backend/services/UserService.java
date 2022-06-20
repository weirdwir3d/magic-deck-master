package com.example.backend.services;

import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    public Optional<User> findUser(String username){
        return userRepository.findById(username);
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }
}
