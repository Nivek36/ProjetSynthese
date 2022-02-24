package com.kevin.projetsynthese.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@Entity
@Builder
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue
    private int idQuestion;

    private String question;
    private String answer;

    @OneToOne
    private Quiz quiz;

    @Builder(builderMethodName = "questionBuilder")
    public Question(int idQuestion, String question, String answer, Quiz quiz) {
        this.idQuestion = idQuestion;
        this.question = question;
        this.answer = answer;
        this.quiz = quiz;
    }
}
