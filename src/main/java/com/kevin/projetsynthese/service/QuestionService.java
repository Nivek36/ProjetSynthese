package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Question;
import com.kevin.projetsynthese.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Optional<Question> createNewQuestion(Question question) {
        try {
            return Optional.of(questionRepository.save(question));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Question>> getAllQuestionsByQuizId(int idQuiz) {
        try {
            return Optional.of(questionRepository.findQuestionsByQuizIdQuiz(idQuiz));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void deleteQuestion(int questionId) {
        questionRepository.deleteById(questionId);
    }
}
