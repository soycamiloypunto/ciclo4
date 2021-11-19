/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.ciclo_cuatro.service;

import com.sergioarboleda.ciclo_cuatro.entity.User;
import com.sergioarboleda.ciclo_cuatro.entity.custom.UserAndMail;
import com.sergioarboleda.ciclo_cuatro.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author cktv
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }
    
    public User save(User user){
        if(user.getId()==null){
            return userRepository.save(user);
        }else{
            Optional<User> e=userRepository.getUser(user.getId());
            if(e.isEmpty()){
                return userRepository.save(user);
            }else{
                return user;
            }
        }
    }
    
    public User update(User user){
        if(user.getId()!=null){
            return userRepository.save(user);
        }else{
            Optional<User> e=userRepository.getUser(user.getId());
            if(!e.isEmpty()){
                if(user.getEmail()!=null){
                    e.get().setEmail(user.getEmail());
                }
                if(user.getName()!=null){
                    e.get().setName(user.getName());
                }
                if(user.getPassword()!=null){
                    e.get().setPassword(user.getPassword());
                }
                return e.get();
            }else{
                return user;
            }
        }
    }
    
    public boolean deleteUser(int id){
        
        
        Boolean aBoolean=getUser(id).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(aBoolean=false);
        
        return aBoolean;
    }
    
    
    //CUSTOMS
    public Boolean getByEmail(String email){
        //Cuento la lista para saber si existe algún registro con ese email
        if(userRepository.findByEmail(email).size()!=0){
            return true;
        }else{
            return false; 
        }
    }
    
    public Object getEmailAndPassword(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
//        System.out.println("Objeto: "+userRepository.findByEmailAndPassword(email, password));
//        if(userRepository.findByEmailAndPassword(email, password)==null){
//            UserAndMail ObjetoCreado= new UserAndMail();
//            ObjetoCreado.setEmail(email);
//            ObjetoCreado.setPassword(password);
//            ObjetoCreado.setName("NO DEFINIDO");
//            System.out.println("Objeto NULO: "+ObjetoCreado);
//            return ObjetoCreado;
//        }else{
//            System.out.println("Objeto NO NULO: "+userRepository.findByEmailAndPassword(email, password));
//            return userRepository.findByEmailAndPassword(email, password);
//        }
        
    }
    
}
