package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService {

    private QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Optional<Quiz> createNewQuiz(Quiz quiz) {
        try {
            return Optional.of(quizRepository.save(quiz));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
