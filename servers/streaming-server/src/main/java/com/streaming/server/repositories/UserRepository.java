package com.streaming.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.streaming.server.entities.User;

public interface UserRepository extends JpaRepository <User, Integer>{
}
