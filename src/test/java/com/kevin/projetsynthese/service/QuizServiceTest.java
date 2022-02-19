package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuizService quizService;

    private Quiz quiz;

    @BeforeEach
    void setup() {
        quiz = Quiz.quizBuilder()
                .idQuiz(1)
                .name("Best quiz")
                .build();
    }

    @Test
    public void createNewQuizTest() {
        when(quizRepository.save(quiz)).thenReturn(quiz);
        Optional<Quiz> actualQuiz = quizService.createNewQuiz(quiz);
        assertThat(actualQuiz.get()).isEqualTo(quiz);
    }

    @Test
    public void createNewQuizFailsTest() {
        when(quizRepository.save(any())).thenReturn(quiz).thenReturn(Optional.empty());
        quizService.createNewQuiz(quiz);
        assertThat(quizService.createNewQuiz(quiz)).isEmpty();
    }
}
