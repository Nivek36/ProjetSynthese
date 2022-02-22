package com.kevin.projetsynthese.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kevin.projetsynthese.model.Player;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(QuizController.class)
public class QuizControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuizService quizService;

    private Quiz quiz;
    private Player player;

    @BeforeEach
    void setup() {
        quiz = Quiz.quizBuilder()
                .idQuiz(1)
                .name("Best quiz")
                .player(player)
                .build();
        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
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

    @Test
    public void getAllQuizzesByPlayerIdTest() throws Exception {
        when(quizService.getAllQuizzesByPlayerId(quiz.getIdQuiz())).thenReturn(Optional.of(getListOfQuizzes()));

        MvcResult result = mockMvc.perform(get("/quiz/get-all-quizzes-by-player/{idQuiz}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    private List<Quiz> getListOfQuizzes() {
        List<Quiz> quizList = new ArrayList<>();
        quizList.add(Quiz.quizBuilder()
                .idQuiz(1)
                .name("Quiz1")
                .player(player)
                .build());
        quizList.add(Quiz.quizBuilder()
                .idQuiz(2)
                .name("Quiz2")
                .player(player)
                .build());
        quizList.add(Quiz.quizBuilder()
                .idQuiz(3)
                .name("Quiz3")
                .player(player)
                .build());
        return quizList;
    }
}
