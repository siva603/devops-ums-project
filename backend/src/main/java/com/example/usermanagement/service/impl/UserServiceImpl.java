
package com.example.usermanagement.service.impl;
import com.example.usermanagement.dao.UserDAO;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.service.UserService;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class UserServiceImpl implements UserService{
 private final UserDAO dao;
 public UserServiceImpl(UserDAO dao){this.dao=dao;}
 public User create(User u){return dao.save(u);}
 public List<User> getAll(){return dao.findAll();}
 public User getById(Long id){return dao.findById(id).orElseThrow();}
 public User update(Long id,User u){
  User e=getById(id);
  e.setFirstName(u.getFirstName());
  e.setLastName(u.getLastName());
  e.setEmail(u.getEmail());
  e.setPhone(u.getPhone());
  e.setAge(u.getAge());
  return dao.save(e);
 }
 public void delete(Long id){dao.deleteById(id);}
}
