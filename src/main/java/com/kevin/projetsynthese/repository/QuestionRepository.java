package com.kevin.projetsynthese.repository;

import com.kevin.projetsynthese.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findQuestionsByQuizIdQuiz(int idQuiz);
}
