
package com.example.usermanagement.service;
import com.example.usermanagement.entity.User;
import java.util.*;
public interface UserService{
 User create(User u);
 List<User> getAll();
 User getById(Long id);
 User update(Long id,User u);
 void delete(Long id);
}
