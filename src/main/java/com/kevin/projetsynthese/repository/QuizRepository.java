package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    List<Quiz> findQuizzesByPlayerId(int id);
}
