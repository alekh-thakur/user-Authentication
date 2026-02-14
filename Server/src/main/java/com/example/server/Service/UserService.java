package com.example.server.Service;

import com.example.server.Repository.UserRepository;
import com.example.server.controller.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public User login(String email,String password){
        User user = userRepository.findByEmail(email)
        .orElseThrow(()-> new RuntimeException("User not found"));

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}
