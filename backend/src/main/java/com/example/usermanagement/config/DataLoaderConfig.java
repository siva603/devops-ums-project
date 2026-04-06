
package com.example.usermanagement.config;

// ✅ Add these imports
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.*;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.entity.User;
@Configuration
public class DataLoaderConfig{
 @Bean
 CommandLineRunner load(UserRepository repo){
  return args->{
   if(repo.count()==0){
    for(int i=1;i<=20;i++){
     repo.save(User.builder().firstName("User"+i).lastName("Test")
      .email("user"+i+"@mail.com").phone("99999999"+i).age(20+i).build());
    }
   }
  };
 }
}
