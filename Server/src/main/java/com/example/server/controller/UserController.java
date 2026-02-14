package com.example.server.controller;


import com.example.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private HandlerMapping resourceHandlerMapping;

    @RequestMapping("/")
    public String home(){
        return "<h1>Welcome</h1>";
    }

    @RequestMapping(value = "/signUp",method = RequestMethod.POST)
    public ResponseEntity<?> signup(@RequestBody User user){
        try{
            return  ResponseEntity.ok(userService.registerUser(user));
        }catch(RuntimeException e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @RequestMapping(value = "/signIn", method = RequestMethod.POST)

    public ResponseEntity<?> signIn(@RequestBody User login){
        try{
            User user = userService.login(
                    login.getEmail(),
                    login.getPassword()
            );
            return ResponseEntity.ok(user);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
