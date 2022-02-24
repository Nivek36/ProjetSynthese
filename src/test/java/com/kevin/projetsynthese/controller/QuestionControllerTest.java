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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
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
}
