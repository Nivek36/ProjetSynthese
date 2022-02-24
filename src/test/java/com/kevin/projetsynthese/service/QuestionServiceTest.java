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

//    private List<Question> getListOfQuestions() {
//        List<Question> questionList = new ArrayList<>();
//        questionList.add(Question.builder()
//                .idQuestion(1)
//                .question("What is 1 + 1?")
//                .answer("2")
//                .build());
//        questionList.add(Question.builder()
//                .idQuestion(2)
//                .question("What is 2 + 2?")
//                .answer("4")
//                .build());
//        questionList.add(Question.builder()
//                .idQuestion(3)
//                .question("What is 3 + 3?")
//                .answer("6")
//                .build());
//        return questionList;
//    }
}
