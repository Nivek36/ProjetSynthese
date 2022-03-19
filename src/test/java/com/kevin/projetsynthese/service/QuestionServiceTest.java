package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Question;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private QuestionService questionService;

    private Question question;
    private Quiz quiz;

    @BeforeEach
    void setup() {
        question = Question.questionBuilder()
                .idQuestion(1)
                .question("What is 1 + 1 ?")
                .answer("2")
                .build();

        quiz = Quiz.quizBuilder()
                .idQuiz(1)
                .name("Best quiz")
                .build();
    }

    @Test
    public void createNewQuestionTest() {
        when(questionRepository.save(question)).thenReturn(question);
        Optional<Question> actualQuestion = questionService.createNewQuestion(question);
        assertThat(actualQuestion.get()).isEqualTo(question);
    }

    @Test
    public void modifyQuestionTest() {
        when(questionRepository.save(question)).thenReturn(question);
        Optional<Question> actualQuestion = questionService.modifyQuestion(question);
        assertThat(actualQuestion.get()).isEqualTo(question);
    }

    @Test
    public void getAllQuestionsByQuizIdTest(){
        when(questionRepository.findQuestionsByQuizIdQuiz(quiz.getIdQuiz())).thenReturn(getListOfQuestions());
        final Optional<List<Question>> allQuestions = questionService.getAllQuestionsByQuizId(quiz.getIdQuiz());
        assertThat(allQuestions.get().size()).isEqualTo(3);
        assertThat(allQuestions.get().get(0).getIdQuestion()).isEqualTo(1);
    }

    private List<Question> getListOfQuestions() {
        List<Question> questionList = new ArrayList<>();
        questionList.add(Question.questionBuilder()
                .idQuestion(1)
                .question("What is 1 + 1?")
                .answer("2")
                .quiz(quiz)
                .build());
        questionList.add(Question.questionBuilder()
                .idQuestion(2)
                .question("What is 2 + 2?")
                .answer("4")
                .quiz(quiz)
                .build());
        questionList.add(Question.questionBuilder()
                .idQuestion(3)
                .question("What is 3 + 3?")
                .answer("6")
                .quiz(quiz)
                .build());
        return questionList;
    }
}
