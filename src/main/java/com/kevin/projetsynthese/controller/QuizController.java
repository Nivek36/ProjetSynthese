package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/get-all-quizzes-by-player/{playerId}")
    public ResponseEntity<List<Quiz>> getAllQuizzesByPlayerId(@PathVariable int playerId){
        return quizService.getAllQuizzesByPlayerId(playerId)
                .map(quiz1 -> ResponseEntity.status(HttpStatus.OK).body(quiz1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
