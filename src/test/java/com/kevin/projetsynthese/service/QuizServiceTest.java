package com.kevin.projetsynthese.service;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.repository.QuizRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuizService quizService;

    private Quiz quiz;
    private Player player;

    @BeforeEach
    void setup() {
        quiz = Quiz.quizBuilder()
                .idQuiz(1)
                .name("Best quiz")
                .build();

        player = Player.playerBuilder()
                .id(1)
                .password("1234")
                .username("Toto")
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

    @Test
    public void getAllQuizzesByPlayerIdTest(){
        when(quizRepository.findQuizzesByPlayerId(player.getId())).thenReturn(getListOfQuizzes());
        final Optional<List<Quiz>> allQuizzes = quizService.getAllQuizzesByPlayerId(player.getId());
        assertThat(allQuizzes.get().size()).isEqualTo(3);
        assertThat(allQuizzes.get().get(0).getIdQuiz()).isEqualTo(1);
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
