package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.service.QuizService;
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

@WebMvcTest(QuizController.class)
public class QuizControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
    public void createNewQuizTest() throws Exception {
        when(quizService.createNewQuiz(quiz)).thenReturn(Optional.of(quiz));

        MvcResult result = mockMvc.perform(post("/quiz/create_new_quiz")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(quiz))).andReturn();

        var actualQuiz = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Quiz.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(quiz).isEqualTo(actualQuiz);
    }
}
