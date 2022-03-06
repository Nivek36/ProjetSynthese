package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Optional<List<Quiz>> getAllQuizzesByPlayerId(int id) {
        try {
            return Optional.of(quizRepository.findQuizzesByPlayerId(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Quiz>> getAllQuizzesByAdminId(int id) {
        try {
            return Optional.of(quizRepository.findQuizzesByAdmin_Id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Quiz>> getAllPublishedQuizzes() {
        try {
            return Optional.of(quizRepository.findQuizzesByIsPublishedTrue());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Quiz> publishQuiz(int idQuiz) {
        try {
            Optional<Quiz> quiz = quizRepository.findById(idQuiz);
            quiz.get().setPublished(true);
            return Optional.of(quizRepository.save(quiz.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
