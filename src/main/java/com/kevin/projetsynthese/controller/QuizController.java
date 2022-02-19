package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Player;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.service.PlayerService;
import com.kevin.projetsynthese.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/create_new_quiz")
    public ResponseEntity<Quiz> createNewQuiz(@RequestBody Quiz quiz) {
        return quizService.createNewQuiz(quiz)
                .map(quiz1 -> ResponseEntity.status(HttpStatus.CREATED).body(quiz1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
