package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Question;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.service.QuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(QuestionController.class)
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
    public void createNewQuestionTest() throws Exception {
        when(questionService.createNewQuestion(question)).thenReturn(Optional.of(question));

        MvcResult result = mockMvc.perform(post("/question/create_new_question")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(question))).andReturn();

        var actualQuestion = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Question.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(question).isEqualTo(actualQuestion);
    }

    @Test
    public void modifyQuestionTest() throws Exception {
        when(questionService.modifyQuestion(question)).thenReturn(Optional.of(question));

        MvcResult result = mockMvc.perform(post("/question/modify_question")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(question))).andReturn();

        var actualQuestion = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Question.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(question).isEqualTo(actualQuestion);
    }

    @Test
    public void getAllQuestionsByQuizIdTest() throws Exception {
        when(questionService.getAllQuestionsByQuizId(quiz.getIdQuiz())).thenReturn(Optional.of(getListOfQuestions()));

        MvcResult result = mockMvc.perform(get("/question/get-all-questions-by-quiz/{quizId}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
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
