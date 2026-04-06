
package com.example.usermanagement.dao.impl;
import com.example.usermanagement.dao.UserDAO;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public class UserDAOImpl implements UserDAO{
 private final UserRepository repo;
 public UserDAOImpl(UserRepository repo){this.repo=repo;}
 public User save(User u){return repo.save(u);}
 public List<User> findAll(){return repo.findAll();}
 public Optional<User> findById(Long id){return repo.findById(id);}
 public void deleteById(Long id){repo.deleteById(id);}
}
