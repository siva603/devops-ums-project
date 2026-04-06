
package com.example.usermanagement.dao;
import com.example.usermanagement.entity.User;
import java.util.*;
public interface UserDAO{
 User save(User u);
 List<User> findAll();
 Optional<User> findById(Long id);
 void deleteById(Long id);
}
