/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.ciclo_cuatro.repository;

import com.sergioarboleda.ciclo_cuatro.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author cktv
 */
@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;
    
    //Get ALl
    public List<User> getAll(){
        return (List<User>) userCrudRepository.findAll();
    }
    
    //Get por Id
    public Optional <User> getUser(int id){
        return userCrudRepository.findById(id);
    }
    
    //SAVE
    public User save(User admin){
        return userCrudRepository.save(admin);
    }
    
    //DELETE
    public void delete(User admin){
        userCrudRepository.delete(admin);
    }
    
    
    //CUSTOMS
    public List<User> findByEmail(String email){
        return userCrudRepository.findByEmail(email);
        
    }
    
    public Object findByEmailAndPassword(String email, String password){
        return userCrudRepository.findByEmailAndPassword(email, password);
        
    }
}
