package com.kevin.projetsynthese.controller;

import com.kevin.projetsynthese.model.Question;
import com.kevin.projetsynthese.model.Quiz;
import com.kevin.projetsynthese.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/create_new_question")
    public ResponseEntity<Question> createNewQuestion(@RequestBody Question question) {
        return questionService.createNewQuestion(question)
                .map(question1 -> ResponseEntity.status(HttpStatus.CREATED).body(question1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-questions-by-quiz/{quizId}")
    public ResponseEntity<List<Question>> getAllQuizzesByPlayerId(@PathVariable int quizId){
        return questionService.getAllQuestionsByQuizId(quizId)
                .map(questionList -> ResponseEntity.status(HttpStatus.OK).body(questionList))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
