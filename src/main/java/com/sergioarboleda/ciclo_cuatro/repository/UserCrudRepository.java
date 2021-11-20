/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.ciclo_cuatro.repository;

import com.sergioarboleda.ciclo_cuatro.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author cktv
 */
public interface UserCrudRepository extends CrudRepository<User, Integer>{
    public List<User> findByEmail(String email);
    public Optional<Object> findByEmailAndPassword (String email, String Password);

}
