
package com.example.usermanagement.controller;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/users")
public class UserController{
 private final UserService service;
 public UserController(UserService service){this.service=service;}
 @PostMapping public User create(@RequestBody User u){return service.create(u);}
 @GetMapping public List<User> all(){return service.getAll();}
 @GetMapping("/{id}") public User one(@PathVariable Long id){return service.getById(id);}
 @PutMapping("/{id}") public User update(@PathVariable Long id,@RequestBody User u){return service.update(id,u);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){service.delete(id);}
}
